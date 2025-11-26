SELECT
    rp.paper_id,
    rp.paper_title,
    COUNT(ap.author_id) AS number_of_authors
FROM research_papers rp
LEFT JOIN author_papers ap
    ON rp.paper_id = ap.paper_id
GROUP BY rp.paper_id, rp.paper_title
ORDER BY rp.paper_id;

SELECT
    COUNT(DISTINCT ap.paper_id) AS total_papers_by_female_authors
FROM authors a
JOIN author_papers ap
    ON a.author_id = ap.author_id
WHERE a.gender = 'female';

SELECT
    university,
    AVG(h_index) AS avg_h_index
FROM authors
GROUP BY university;

SELECT
    a.university,
    COUNT(DISTINCT ap.paper_id) AS total_papers
FROM authors a
LEFT JOIN author_papers ap
    ON a.author_id = ap.author_id
GROUP BY a.university;

SELECT
    university,
    MIN(h_index) AS min_h_index,
    MAX(h_index) AS max_h_index
FROM authors
GROUP BY university;
