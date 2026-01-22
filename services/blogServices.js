import { pool } from "../configs/postgresconnection.js";

// Get all blogs
export const getAllBlogsService = async () => {
  const query = `
    SELECT
      b.id,
      b.title,
      b.slug,
      b.excerpt,
      b.hero_image AS "heroImage",
      b.category,
      b.date,
      b.read_time AS "readTime",
      b.status,
      b.meta_title AS "metaTitle",
      b.meta_description AS "metaDescription",
      b.meta_keywords AS "metaKeywords",
      b.canonical_url AS "canonicalUrl",
      b.created_at,

      -- Author object
      CASE 
        WHEN a.id IS NULL THEN NULL
        ELSE json_build_object(
          'name', a.name,
          'image', a.image_url
        )
      END AS author,

      -- Sections array
      COALESCE(
        json_agg(
          json_build_object(
            'title', s.title,
            'content', s.content,
            'image', s.image,
            'quote', s.quote,
            'quoteAuthor', s.quote_author,
            'highlightTitle', s.highlight_title,
            'highlights', s.highlights
          )
          ORDER BY s.section_order
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) AS sections

    FROM blogs b
    LEFT JOIN authors a ON a.id = b.author_id
    LEFT JOIN blog_sections s ON s.blog_id = b.id

    GROUP BY b.id, a.id
    ORDER BY b.created_at DESC;
  `;

  const result = await pool.query(query);

  return {
    success: true,
    data: result.rows,
    message: result.rows.length
      ? "Blogs retrieved successfully"
      : "No blogs found"
  };
};


// Get blog by ID with sections
export const getBlogByIdService = async (slug) => {
  const blogRes = await pool.query(`SELECT * FROM blogs WHERE slug = $1`, [slug]);
  const id = blogRes.rows[0].id
  if (!blogRes.rows.length) {
    return { success: false, data: null, message: 'Blog not found' };
  }

  const sectionsRes = await pool.query(
    `SELECT * FROM blog_sections WHERE blog_id = $1 ORDER BY section_order ASC`,
    [id]
  );

  return {
    success: true,
    data: { ...blogRes.rows[0], sections: sectionsRes.rows },
    message: 'Blog retrieved successfully'
  };
};