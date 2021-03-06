import Random from './random';
import Color from './color';

export type SpriteCollection = (random: Random) => string;

export default class Avatars {
  public static random = Random;
  public static color = Color;

  protected spriteCollection: SpriteCollection;

  /**
   * @param spriteCollection
   */
  public constructor(spriteCollection: SpriteCollection) {
    this.spriteCollection = spriteCollection;
  }

  /**
   * Creates an avatar
   *
   * @param seed
   */
  public create(seed: string) {
    return this.spriteCollection(new Random(seed));
  }
}
