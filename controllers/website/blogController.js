import { pool } from "../../configs/postgresconnection.js";
import { getBlogByIdService } from "../../services/blogServices.js";


export const viewAllBlogs = async (req, res) => {
    try {
        // 🔹 Fetch all blogs
        const query = `
      SELECT b.id, b.title, b.slug, b.excerpt, b.hero_image, b.category, b.date,
             b.read_time, b.status, a.name AS author_name, a.image_url AS author_image
      FROM blogs b
      LEFT JOIN authors a ON b.author_id = a.id
      ORDER BY b.date DESC;
    `;

        const { rows } = await pool.query(query);

        res.status(200).json({
            success: true,
            data: rows,
        });

    } catch (error) {
        console.error("Error fetching blogs:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching blogs",
            error: error.message,
        });
    }
}

export const viewBlogBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        // 1️⃣ Fetch blog info along with author name
        const blogQuery = `
            SELECT b.*, a.name AS author_name
            FROM blogs b
            LEFT JOIN authors a ON b.author_id = a.id
            WHERE b.slug = $1
        `;
        const blogResult = await pool.query(blogQuery, [slug]);

        // 2️⃣ If no blog found, return 404
        if (blogResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        const blog = blogResult.rows[0];

        // 3️⃣ Fetch all sections for this blog using its id
        const sectionsResult = await pool.query(
            `SELECT * FROM blog_sections WHERE blog_id = $1 ORDER BY section_order ASC`,
            [blog.id]
        );

        // 4️⃣ Add sections array to blog object
        blog.sections = sectionsResult.rows;

        // 5️⃣ Send combined response
        res.json({ success: true, data: blog });
    } catch (err) {
        console.error("Error fetching blog by slug:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}






export const getBlogById = async (req, res) => {
    const { slug } = req.params
    try {
        const blog = await getBlogByIdService(slug);

        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

