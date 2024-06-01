import { MigrationInterface, QueryRunner } from "typeorm";

export class UserArtist1717251121756 implements MigrationInterface {
    name = 'UserArtist1717251121756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "UQ_3c2c776c0a094c15d6c165494c0" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "FK_3c2c776c0a094c15d6c165494c0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "FK_3c2c776c0a094c15d6c165494c0"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "UQ_3c2c776c0a094c15d6c165494c0"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "userId"`);
    }

}
