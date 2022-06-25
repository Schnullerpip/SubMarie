import { Body, Composite, Engine, Events } from "matter-js";
import { ObjectPool } from "./ObjectPool";

export interface Particle extends Body {
    age: number;
}

export class ParticleSystem<T extends Particle> {
    private particles: T[] = [];

    private updateRoutine: (e: any) => void;

    constructor(
        private readonly engine: Engine,
        private readonly pool: ObjectPool<T>,
        private readonly initializer: (instance: T) => void,
        private rate = 0.15,
        private readonly lifeTime = 2
    ) {
        this.updateRoutine = this.update.bind(this);
        Events.on(engine, "beforeUpdate", this.updateRoutine);
    }

    stop() {
        this.rate = Infinity;
    }

    clear() {
        this.particles.forEach((p) => Composite.remove(this.engine.world, p));
        Events.off(this.engine, "beforeUpdate", this.updateRoutine);
    }

    private update(event: Matter.IEventTimestamped<Engine>) {
        const deltaTime = event.source.timing.lastDelta / 1000;

        this.killOldParticles(deltaTime);
        this.birthNewParticles(deltaTime);
    }

    private killOldParticles(deltaTime: number) {
        this.particles.forEach((particle, i) => {
            if ((particle.age += deltaTime) >= this.lifeTime) {
                Composite.remove(this.engine.world, particle);
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
                instance.age = 0;
                this.initializer(instance);
                Composite.add(this.engine.world, instance);

                this.particles.push(instance);
            }
        };
    })();
}
