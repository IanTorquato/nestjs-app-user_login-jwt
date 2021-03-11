import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Mask1615473392856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mask',
        columns: [
          {
            name: 'mask_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'color',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cost',
            type: 'money',
            isNullable: false,
          },
          {
            name: 'size',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mask');
  }
}
