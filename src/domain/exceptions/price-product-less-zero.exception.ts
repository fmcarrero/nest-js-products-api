/* eslint-disable @typescript-eslint/no-useless-constructor */
export default class PriceProductLessZeroException extends Error {
  constructor(message: string) {
    super(message);
  }
}
