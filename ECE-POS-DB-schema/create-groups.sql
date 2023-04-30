-- Table: public.groups

-- DROP TABLE IF EXISTS public.groups;

CREATE TABLE IF NOT EXISTS public.groups
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    group_name character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT groups_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.groups
    OWNER to dbmasteruser;