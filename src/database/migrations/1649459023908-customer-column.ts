import { MigrationInterface, QueryRunner } from 'typeorm';

export class customerColumn1649459023908 implements MigrationInterface {
  name = 'customerColumn1649459023908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" RENAME COLUMN "lastName" TO "last_name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" RENAME COLUMN "last_name" TO "lastName"`,
    );
  }
}
