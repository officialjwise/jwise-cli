import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function DatabaseTypeormPage() {
  return (
    <DocsLayout
      title="TypeORM Setup"
      description="Configure TypeORM for your jwise-generated NestJS backend."
    >
      <Callout type="info">
        TypeORM is a great choice if you prefer a more traditional ORM experience or need advanced features like query builder and entity listeners.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Generated Entities</h2>
      
      <p className="text-muted-foreground mb-4">
        When you create a project with <code className="px-1.5 py-0.5 rounded bg-muted text-sm">jwise new --auth -o typeorm</code>, these entities are generated:
      </p>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">User Entity</h3>
      <CodeBlock
        code={`// src/entities/user.entity.ts
import { 
  Entity, Column, PrimaryGeneratedColumn, 
  CreateDateColumn, UpdateDateColumn, OneToMany 
} from 'typeorm';
import { Session } from './session.entity';
import { Token } from './token.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  failedLogins: number;

  @Column({ type: 'timestamp', nullable: true })
  lockedUntil: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];

  @OneToMany(() => Token, token => token.user)
  tokens: Token[];
}`}
        language="typescript"
        filename="user.entity.ts"
        showLineNumbers
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Session Entity</h3>
      <CodeBlock
        code={`// src/entities/session.entity.ts
import { 
  Entity, Column, PrimaryGeneratedColumn, 
  ManyToOne, CreateDateColumn, Index 
} from 'typeorm';
import { User } from './user.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  userId: string;

  @ManyToOne(() => User, user => user.sessions, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  deviceInfo: string;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastActivity: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}`}
        language="typescript"
        filename="session.entity.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Database Configuration</h2>

      <CodeBlock
        code={`// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'myapp',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true,
};`}
        language="typescript"
        filename="database.config.ts"
      />

      <Callout type="warning" title="Production Warning">
        Never use <code className="px-1 py-0.5 rounded bg-muted text-xs">synchronize: true</code> in production! Always use migrations instead.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Environment Variables</h2>

      <CodeBlock
        code={`# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=myapp`}
        language="bash"
        filename=".env"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Running Migrations</h2>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Generate a Migration</h3>
      <CodeBlock
        code="npm run migration:generate -- -n CreateAuthTables"
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Run Migrations</h3>
      <CodeBlock
        code="npm run migration:run"
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Revert Last Migration</h3>
      <CodeBlock
        code="npm run migration:revert"
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Using Repositories</h2>

      <CodeBlock
        code={`// Example: User repository usage
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      relations: ['sessions'],
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.userRepo.create({
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name,
    });
    return this.userRepo.save(user);
  }

  async updateFailedLogins(userId: string, count: number) {
    await this.userRepo.update(userId, { 
      failedLogins: count,
      lockedUntil: count >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null,
    });
  }
}`}
        language="typescript"
        filename="user.service.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Query Builder</h2>

      <p className="text-muted-foreground mb-4">
        TypeORM's query builder is powerful for complex queries:
      </p>

      <CodeBlock
        code={`// Complex query example
const activeSessions = await this.sessionRepo
  .createQueryBuilder('session')
  .innerJoinAndSelect('session.user', 'user')
  .where('session.expiresAt > :now', { now: new Date() })
  .andWhere('user.isActive = :active', { active: true })
  .orderBy('session.lastActivity', 'DESC')
  .take(10)
  .getMany();`}
        language="typescript"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Database Migrations"
          description="Learn advanced migration strategies."
          href="/docs/database/migrations"
        />
        <LinkCard
          title="Prisma Setup"
          description="Compare with Prisma ORM."
          href="/docs/database/prisma"
        />
      </div>
    </DocsLayout>
  );
}
