export default class Product {
  private id: string;

  private readonly name: string;

  private readonly description: string;

  private readonly imageUrl: string;

  private readonly price: number;

  private readonly createAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    createAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.createAt = createAt;
  }

  public getName(): string {
    return this.name;
  }
}
