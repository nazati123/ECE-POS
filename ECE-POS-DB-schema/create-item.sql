-- Table: public.item

-- DROP TABLE IF EXISTS public.item;

CREATE TABLE IF NOT EXISTS public.item
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    quantity smallint NOT NULL,
    part_num character varying(100) COLLATE pg_catalog."default" NOT NULL,
    item_desc character varying(200) COLLATE pg_catalog."default" NOT NULL,
    price numeric NOT NULL,
    total numeric NOT NULL,
    order_id integer NOT NULL,
    CONSTRAINT item_pkey PRIMARY KEY (id),
    CONSTRAINT "Order_id" FOREIGN KEY (order_id)
        REFERENCES public.order_form (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item
    OWNER to dbmasteruser;