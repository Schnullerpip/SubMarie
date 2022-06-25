import { Body, Composite, Engine, Events } from "matter-js";
import { ObjectPool } from "./ObjectPool";

export class ParticleSystem<T extends Body> {
    private particles: {
        age: number;
        instance: T;
    }[] = [];

    constructor(
        private readonly engine: Engine,
        private readonly pool: ObjectPool<T>,
        private readonly initializer: (instance: T) => void,
        private readonly rate = 0.25,
        private readonly lifeTime = 2
    ) {
        Events.on(engine, "beforeUpdate", (event) => {
            const deltaTime = event.source.timing.lastDelta;
            this.update(deltaTime);
        });
    }

    private update(deltaTimeMs: number) {
        const deltaTime = deltaTimeMs / 1000;

        this.killOldParticles(deltaTime);
        this.birthNewParticles(deltaTime);
    }

    private killOldParticles(deltaTime: number) {
        this.particles.forEach((particle, i) => {
            if ((particle.age += deltaTime) >= this.lifeTime) {
                Composite.remove(this.engine.world, particle.instance);
                this.particles.splice(i, 1);
            }
        });
    }

    private birthNewParticles = (() => {
        let timeSinceLastBirth = 0;

        return (deltaTime: number) => {
            if ((timeSinceLastBirth += deltaTime) >= this.rate) {
                timeSinceLastBirth = 0;
                const instance = this.pool.getInstance();
                this.initializer(instance);
                Composite.add(this.engine.world, instance);

                this.particles.push({
                    age: 0,
                    instance,
                });
            }
        };
    })();
}
