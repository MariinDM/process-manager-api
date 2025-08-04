import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1753723812609 implements MigrationInterface {
    name = 'Migration1753723812609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('pending', 'in_progress', 'completed')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."task_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tasks" ("taskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_07df033b0b61ee58ded3168bf2a" PRIMARY KEY ("taskId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eff2f1ef189a7952bc6294a1da" ON "user_tasks" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_83e94423ca0675e4ac503d8641" ON "user_tasks" ("userId") `);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`ALTER TABLE "tokens" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_eff2f1ef189a7952bc6294a1da5" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_83e94423ca0675e4ac503d86413" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_83e94423ca0675e4ac503d86413"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_eff2f1ef189a7952bc6294a1da5"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`ALTER TABLE "tokens" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83e94423ca0675e4ac503d8641"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eff2f1ef189a7952bc6294a1da"`);
        await queryRunner.query(`DROP TABLE "user_tasks"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    }

}
