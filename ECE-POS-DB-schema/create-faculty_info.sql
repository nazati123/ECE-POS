-- Table: public.faculty_info

-- DROP TABLE IF EXISTS public.faculty_info;

CREATE TABLE IF NOT EXISTS public.faculty_info
(
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT faculty_info_pkey PRIMARY KEY (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.faculty_info
    OWNER to dbmasteruser;