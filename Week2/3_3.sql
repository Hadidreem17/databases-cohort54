SELECT 
    a.author_name AS author,
    m.author_name AS mentor
FROM authors a
LEFT JOIN authors m
    ON a.mentor = m.author_id;

SELECT 
    a.*,
    rp.paper_title
FROM authors a
LEFT JOIN author_papers ap
    ON a.author_id = ap.author_id
LEFT JOIN research_papers rp
    ON ap.paper_id = rp.paper_id;

