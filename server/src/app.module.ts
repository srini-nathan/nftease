import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "./core/config";
import { config } from "./app.config";
import { EventStoreModule } from "./core/event-store";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";

const configProvider = {
  provide: "CONFIG",
  useValue: new ConfigService(config).getConfig(),
};

@Module({
  imports: [
    ConfigModule.forRoot(config),
    EventStoreModule.forRoot(config),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.getMongo(),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [configProvider],
})
export class AppModule {}
