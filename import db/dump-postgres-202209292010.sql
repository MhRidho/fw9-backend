--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.3

-- Started on 2022-09-29 20:10:59

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- TOC entry 3028 (class 1262 OID 12974)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 3028
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 3031 (class 0 OID 0)
-- Name: postgres; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE postgres SET "app.settings.jwt_secret" TO 'zcF4lGKC8qgaw9ORFD9z6d8I1Db/l3u2t2NLIRlRwMW7yWQgm+meKZ1A7BOFgrIXSVDp+qdjrDfBahquL172CQ==';
ALTER DATABASE postgres SET "app.settings.jwt_exp" TO '3600';


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 14 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3032 (class 0 OID 0)
-- Dependencies: 14
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 263 (class 1259 OID 17707)
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    fullname character varying(255),
    phonenumber character varying(255),
    balance numeric DEFAULT 0,
    picture character varying(255),
    user_id integer
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- TOC entry 264 (class 1259 OID 17713)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 265 (class 1259 OID 17714)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    amount numeric NOT NULL,
    recipient_id integer,
    sender_id integer,
    notes text,
    "time" timestamp without time zone NOT NULL,
    type_id integer NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 266 (class 1259 OID 17719)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 267 (class 1259 OID 17720)
-- Name: transaction_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_type (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.transaction_type OWNER TO postgres;

--
-- TOC entry 268 (class 1259 OID 17725)
-- Name: transaction_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction_type ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 269 (class 1259 OID 17726)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(18) NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    pin character varying(6)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 270 (class 1259 OID 17731)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3015 (class 0 OID 17707)
-- Dependencies: 263
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, fullname, phonenumber, balance, picture, user_id) FROM stdin;
56	\N	\N	0	\N	86
57	\N	\N	0	\N	87
58	\N	\N	0	\N	88
59	\N	\N	0	\N	89
60	\N	\N	0	\N	90
52	admin3	085212873466	10000	\N	79
53	admin4	\N	0	\N	80
54	admin5	\N	0	\N	81
55	admin6	\N	0	\N	82
61	\N	\N	0	\N	94
62	\N	\N	0	\N	95
64	\N	\N	0	\N	97
63	\N	\N	200000	\N	96
50	admin	085212873477	28000	1662697380987.png	77
51	admin2	081283282934	32000	1663577947730.png	78
\.


--
-- TOC entry 3017 (class 0 OID 17714)
-- Dependencies: 265
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, amount, recipient_id, sender_id, notes, "time", type_id) FROM stdin;
71	1000	78	77	buy product	2022-07-12 00:00:00	2
74	1000	78	77	buy product	2022-07-12 00:00:00	2
82	100	78	77	book	2022-09-14 15:23:49.23	1
90	20000	77	\N	savings	2022-09-15 00:00:00	1
91	900	78	77	buy book	2022-09-16 04:05:19.233	1
92	10000	78	\N	top up	2022-09-17 00:00:00	2
93	10000	79	\N	top up	2022-09-17 00:00:00	1
94	7000	78	77	transfer	2022-09-20 04:19:35.479	1
95	5000	78	77	buy water	2022-09-23 04:34:32.79	1
96	5000	78	77	buy water	2022-09-23 04:34:32.79	1
97	5000	77	\N	top up	2022-09-23 00:00:00	1
98	200000	96	\N		2022-09-23 00:00:00	1
99	5000	77	\N	Tu	2022-09-29 00:00:00	1
100	2000	78	77	Tf	2022-09-29 02:22:38.635	1
\.


--
-- TOC entry 3019 (class 0 OID 17720)
-- Dependencies: 267
-- Data for Name: transaction_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_type (id, name, description) FROM stdin;
7	John	Subscription
1	Berry	Transfer
2	Thom	Top Up
4	Jery	Subscription
6	Guy	Transfer
8	Ridho	Top Up
9	bambang	transfer
10	testingadmin	transfer
11	budi	transfer
12	budi	transfer
\.


--
-- TOC entry 3021 (class 0 OID 17726)
-- Dependencies: 269
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, username, pin) FROM stdin;
82	user6@gmail.com	$2b$10$5FbXJ2e7pTWZ048mwM1txOqN8HDrVHf1NH.NCLc79/COGKdQJK6MC	user6	\N
86	user7@gmail.com	$2b$10$OPbgMZn3gTlxOtZAwFo0SurhVTykSJtSY4McvvKeQTbz1tZ6OlrNi	user7	\N
87	user8@gmail.com	$2b$10$OcPYFAuFIdleRzjPvsuN5uJbwqpT.BbMlEVauXKDls/YrqKzayR2K	user8	\N
88	user9@gmail.com	$2b$10$Tnkij8vzX8bND1FaikklseTxXI6M2SgW9IVi5GbgK6K1OsvSa/NfK	user9	\N
89	user10@gmail.com	$2b$10$tcfkHpGGV.Qxe6La0wyGO.bJktvFxutuK8h8LW5/VjyPZ3Qzbbrz.	user10	\N
90	user11@gmail.com	$2b$10$.uqx7yQK2FTPEER9a2urAuF9xa5L/h4hRfbBQ/7nP8nZuGOoelck6	user11	123456
91	dumb@gmail.com	$2b$10$IY7nd23m0gJ9cXlAVHUqLu/2AUlfbiP6ssCiLSwMoQZnsyYe/8DFG	dumb	923232
92	testing@gmail.com	$2b$10$3sMwadTwOE8paVjrQ9VwN.NWp6r5ylxCNB7oa1Cah0UafhMrv3Cu2	testing	923232
93	testing2@gmail.com	$2b$10$3gOtW/F.4g8hhc.A.Hk3P.pSEnOt49RUC44kEDMPvZgbBDaFCra.e	testing2	123467
94	ridho@gmail.com	$2b$10$vvHm8grRREoUwICUipG/7.RsyBxpJib9tavq8kMeJQ40hZ7wIvSA.	ridho	\N
77	user@gmail.com	$2b$10$qhFcptvV08C5FIUPj.0t0OyprgwZEHXByep3HZfkj3cL0C7RUZbQC	user	123456
78	user2@gmail.com	$2b$10$DmaEeAG6NOyNCr59jlfCaevuqg5X7dM6PIqsMRVIXlC3s12MhBHbq	user2	\N
79	user3@gmail.com	$2b$10$Oi/H172w8YmKQ5nH1Q/4ge0/XstLuwCGgZ8pTk2rO//Pb999awE.e	user3	\N
80	user4@gmail.com	$2b$10$tpMDHUdCEJAT9QC4LAdjUe8SOUbii3ESi4QsblQIcIef9KWD6lHXW	user4	\N
81	user5@gmail.com	$2b$10$QHzNNgUitC9R5SObYiLG6O8G9ncIn0VHjBwYzR4tckuknc3ZeXNPy	user5	\N
95	tedi@gmail.com	$2b$10$RF6T/Z0l7XU3IL.WOb3kmOIBnx8EyHSbJs13SKPxFMhwqBZLo3XPm	Tedi	123456
96	aadmin@mail.com	$2b$10$HuDNt.WGD.HoU.UrRCema.yzIKvJvsUCi9k26eCF8v1WT0Qf47toC	aadmin	123123
97	aaadmin@mail.com	$2b$10$kXx73lZA98aBCiyeU7cR8Oo0MhQaxcH3LoSzkCSlBE7n7uW4z7MVe	aaadmin	123123
\.


--
-- TOC entry 3042 (class 0 OID 0)
-- Dependencies: 264
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 64, true);


--
-- TOC entry 3043 (class 0 OID 0)
-- Dependencies: 266
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 100, true);


--
-- TOC entry 3044 (class 0 OID 0)
-- Dependencies: 268
-- Name: transaction_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_type_id_seq', 12, true);


--
-- TOC entry 3045 (class 0 OID 0)
-- Dependencies: 270
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 97, true);


--
-- TOC entry 2861 (class 2606 OID 17733)
-- Name: profile profile_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_un UNIQUE (phonenumber);


--
-- TOC entry 2863 (class 2606 OID 17735)
-- Name: users users_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_un UNIQUE (email);


--
-- TOC entry 3030 (class 0 OID 0)
-- Dependencies: 3028
-- Name: DATABASE postgres; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON DATABASE postgres TO dashboard_user;


--
-- TOC entry 3033 (class 0 OID 0)
-- Dependencies: 14
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- TOC entry 3034 (class 0 OID 0)
-- Dependencies: 263
-- Name: TABLE profile; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profile TO anon;
GRANT ALL ON TABLE public.profile TO authenticated;
GRANT ALL ON TABLE public.profile TO service_role;


--
-- TOC entry 3035 (class 0 OID 0)
-- Dependencies: 264
-- Name: SEQUENCE profile_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.profile_id_seq TO anon;
GRANT ALL ON SEQUENCE public.profile_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.profile_id_seq TO service_role;


--
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 265
-- Name: TABLE transaction; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.transaction TO anon;
GRANT ALL ON TABLE public.transaction TO authenticated;
GRANT ALL ON TABLE public.transaction TO service_role;


--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 266
-- Name: SEQUENCE transaction_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.transaction_id_seq TO anon;
GRANT ALL ON SEQUENCE public.transaction_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.transaction_id_seq TO service_role;


--
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 267
-- Name: TABLE transaction_type; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.transaction_type TO anon;
GRANT ALL ON TABLE public.transaction_type TO authenticated;
GRANT ALL ON TABLE public.transaction_type TO service_role;


--
-- TOC entry 3039 (class 0 OID 0)
-- Dependencies: 268
-- Name: SEQUENCE transaction_type_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.transaction_type_id_seq TO anon;
GRANT ALL ON SEQUENCE public.transaction_type_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.transaction_type_id_seq TO service_role;


--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 269
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 270
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.users_id_seq TO anon;
GRANT ALL ON SEQUENCE public.users_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.users_id_seq TO service_role;


--
-- TOC entry 2472 (class 826 OID 16668)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- TOC entry 2473 (class 826 OID 16669)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- TOC entry 2471 (class 826 OID 16667)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- TOC entry 2475 (class 826 OID 16671)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- TOC entry 2470 (class 826 OID 16666)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- TOC entry 2474 (class 826 OID 16670)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


-- Completed on 2022-09-29 20:11:06

--
-- PostgreSQL database dump complete
--

