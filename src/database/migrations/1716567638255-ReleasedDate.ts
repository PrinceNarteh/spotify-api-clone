import { MigrationInterface, QueryRunner } from "typeorm";

export class ReleasedDate1716567638255 implements MigrationInterface {
    name = 'ReleasedDate1716567638255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" RENAME COLUMN "releasedDate" TO "released_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" RENAME COLUMN "released_date" TO "releasedDate"`);
    }

}
