CREATE TABLE "students" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"class_id" integer NOT NULL,
	"token" uuid NOT NULL UNIQUE,
	CONSTRAINT "students_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" TEXT NOT NULL,
	"student_id" integer NOT NULL,
	"tags" varchar(255) NOT NULL,
	"answered" BOOLEAN NOT NULL DEFAULT 'false',
	"submitAt" DATE NOT NULL DEFAULT 'now()',
	"score" integer NOT NULL DEFAULT '1',
	"points" integer,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "answers" (
	"id" serial NOT NULL,
	"answer" varchar(255) NOT NULL,
	"student_id" integer NOT NULL,
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "answered_questions" (
	"id" serial NOT NULL,
	"question_id" integer NOT NULL,
	"answer_id" integer NOT NULL,
	"answeredAt" DATE NOT NULL DEFAULT 'now()',
	CONSTRAINT "answered_questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "classes" (
	"id" serial NOT NULL,
	"name" varchar(5) NOT NULL,
	CONSTRAINT "classes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "students" ADD CONSTRAINT "students_fk0" FOREIGN KEY ("class_id") REFERENCES "classes"("id");

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("student_id") REFERENCES "students"("id");

ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("student_id") REFERENCES "students"("id");

ALTER TABLE "answered_questions" ADD CONSTRAINT "answered_questions_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "answered_questions" ADD CONSTRAINT "answered_questions_fk1" FOREIGN KEY ("answer_id") REFERENCES "answers"("id");


INSERT INTO classes (name) VALUES ('T1');
INSERT INTO classes (name) VALUES ('T2');
INSERT INTO classes (name) VALUES ('T3');
INSERT INTO classes (name) VALUES ('T4');
