create table "public"."register_team_requests" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "team" integer,
    "email" text not null
);


alter table "public"."register_team_requests" enable row level security;

CREATE UNIQUE INDEX register_team_requests_pkey ON public.register_team_requests USING btree (id);

alter table "public"."register_team_requests" add constraint "register_team_requests_pkey" PRIMARY KEY using index "register_team_requests_pkey";

create policy "Enable insert access for everyone"
on "public"."register_team_requests"
as permissive
for insert
to public
with check (true);



