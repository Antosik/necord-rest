import { Test } from '@nestjs/testing';

import { NecordModule } from '../src';
import { ExplorerService } from '../src/necord-explorer.service';
import { NecordOptionsFactory, NecordModuleOptions } from '../src/necord-options.interface';

describe('NecordModule', () => {
	const defaultNecordOptions: NecordModuleOptions = {
		applicationId: 'applicationId',
		publicKey: 'publicKey',
		token: 'token',
		skipRegistration: true
	};

	describe('forRoot', () => {
		it('should compile the module', async () => {
			const module = await Test.createTestingModule({
				imports: [NecordModule.forRoot(defaultNecordOptions)]
			}).compile();

			expect(module).toBeDefined();
			expect(module.get(ExplorerService)).toBeInstanceOf(ExplorerService);
		});
	});

	describe('forRootAsync', () => {
		it('should compile the module with useFactory', async () => {
			const module = await Test.createTestingModule({
				imports: [
					NecordModule.forRootAsync({
						useFactory: () => defaultNecordOptions
					})
				]
			}).compile();

			expect(module).toBeDefined();
			expect(module.get(ExplorerService)).toBeInstanceOf(ExplorerService);
		});

		it('should compile the module with useClass', async () => {
			class MyNecordOptionsFactory implements NecordOptionsFactory {
				createNecordOptions() {
					return defaultNecordOptions;
				}
			}

			const module = await Test.createTestingModule({
				imports: [
					NecordModule.forRootAsync({
						useClass: MyNecordOptionsFactory
					})
				]
			}).compile();

			expect(module).toBeDefined();
			expect(module.get(ExplorerService)).toBeInstanceOf(ExplorerService);
		});
	});
});
