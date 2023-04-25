-- Table: public.order_form

-- DROP TABLE IF EXISTS public.order_form;

CREATE TABLE IF NOT EXISTS public.order_form
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    date_created date,
    acc_num integer,
    grant_end_date date,
    req_person character varying(50) COLLATE pg_catalog."default",
    phone character varying(10) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    room character varying(50) COLLATE pg_catalog."default",
    fac_emails character varying(750) COLLATE pg_catalog."default",
    is_standing_contract boolean,
    is_auth boolean DEFAULT false,
    is_ordered boolean DEFAULT false,
    is_completed boolean DEFAULT false,
    tracking character varying(255) COLLATE pg_catalog."default",
    ship_total numeric,
    total_cost numeric,
    name character varying(50) COLLATE pg_catalog."default",
    address character varying(100) COLLATE pg_catalog."default",
    url character varying(100) COLLATE pg_catalog."default",
    phone_num character varying(10) COLLATE pg_catalog."default",
    fax_num character varying(10) COLLATE pg_catalog."default",
    contact_person character varying(50) COLLATE pg_catalog."default",
    date_authorized date,
    date_ordered date,
    date_completed date,
    invoice_email character varying(50) COLLATE pg_catalog."default",
    purpose character varying(250) COLLATE pg_catalog."default",
    is_student_form boolean,
    group_id character varying(100) COLLATE pg_catalog."default",
    approved_by character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT order_form_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.order_form
    OWNER to dbmasteruser;