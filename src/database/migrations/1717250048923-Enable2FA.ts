import { MigrationInterface, QueryRunner } from "typeorm";

export class Enable2FA1717250048923 implements MigrationInterface {
    name = 'Enable2FA1717250048923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "enable2FA" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "twoFASecret" text`);
        await queryRunner.query(`ALTER TABLE "user" ADD "apiKey" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "apiKey"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twoFASecret"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "enable2FA"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "userId"`);
    }

}
