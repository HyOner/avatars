import SpriteCollection from './model/sprite/collection';

import Avatar from './model/avatar';
import Color from './model/color';
import Sprite from './model/sprite';

import Random from './helper/random';

interface SvgAttributes {
  xmlns: string;
  'xmlns:xlink': string;
  viewBox: string;
  version: number;
  width?: number;
  height?: number;
}

export default class Avatars {
  public static model = {
    avatar: Avatar,
    color: Color,
    sprite: Sprite
  };

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
  public async create(seed: string, width: number = null, height: number = null) {
    return new Avatar('<svg ' + this.getSvgAttributes() + '>' + this.getSvgPaths(new Random(seed)) + '</svg>');
  }

  /**
   * Get SVG attributes
   *
   * @param width
   * @param height
   */
  protected getSvgAttributes(width: number = null, height: number = null) {
    let originalWidth = this.spriteCollection.width;
    let originalHeight = this.spriteCollection.height;

    let attributes: SvgAttributes = {
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      viewBox: '0 0 ' + originalWidth + ' ' + originalHeight,
      version: 1.1
    };

    if (width || height) {
      attributes['width'] = width || originalHeight / originalWidth * width;
      attributes['height'] = height || originalWidth / originalHeight * height;
    }

    return Object.keys((key: keyof SvgAttributes) => {
      return key + '="' + attributes[key] + '"';
    });
  }

  /**
   * Get generated SVG paths
   *
   * @param random
   */
  protected getSvgPaths(random: Random) {
    return this.spriteCollection
      .get()
      .map(sprite => sprite.get(random))
      .join('');
  }
}
