import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1755706572551 implements MigrationInterface {
    name = 'Migration1755706572551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f964e961aa0e77429b504dd9c54"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_f964e961aa0e77429b504dd9c54"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "basicInfoId"`);
        await queryRunner.query(`ALTER TABLE "basic_info" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "basic_info" ADD CONSTRAINT "UQ_b1be62a91950a5922a234dd9439" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "basic_info" ADD CONSTRAINT "FK_b1be62a91950a5922a234dd9439" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "basic_info" DROP CONSTRAINT "FK_b1be62a91950a5922a234dd9439"`);
        await queryRunner.query(`ALTER TABLE "basic_info" DROP CONSTRAINT "UQ_b1be62a91950a5922a234dd9439"`);
        await queryRunner.query(`ALTER TABLE "basic_info" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "basicInfoId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_f964e961aa0e77429b504dd9c54" UNIQUE ("basicInfoId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f964e961aa0e77429b504dd9c54" FOREIGN KEY ("basicInfoId") REFERENCES "basic_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
