import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1755626215596 implements MigrationInterface {
    name = 'Migration1755626215596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "basic_info" ("id" SERIAL NOT NULL, "gender" character varying NOT NULL, "location" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "summary" character varying NOT NULL, "website" character varying NOT NULL, "github" character varying NOT NULL, "linkedin" character varying NOT NULL, "work" jsonb NOT NULL, "education" jsonb NOT NULL, "skills" text array NOT NULL, CONSTRAINT "PK_4d6e4a85199cd524fa0954e665d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "task"."active" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."active" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."active" IS 'Indicates if the user is active'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "task"."active" IS 'Indicates if the task is active'`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "active" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "basic_info"`);
    }

}
