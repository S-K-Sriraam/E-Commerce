const baseImagePath =
  process.env.NODE_ENV === "production"
    ? "https://s-k-sriraam.github.io/E-Commerce/images"
    : "/images";

const products= [
    {
        '_id': '1',
        'name': 'Airpods Wireless Bluetooth Headphones',
        'image': `${baseImagePath}/airpods.jpeg`,
        'description': 'Bluetooth technology lets you connect it with compatible devices wirelessly High-qualtiy AAC audio offers immersive listenting experience Built-in microphone allows you to take calls while working',
        'brand': 'Apple',
        'category': 'Electronics',
        'price': 89.99,
        'countInStock': 0,
        'rating': 4.5,
        'numReviews': 12,
    },
    {
        '_id': '2',
        'name': 'iPhone 11 Pro 256GB Memory',
        'image': `${baseImagePath}/phone.jpeg`,
        'description': 'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.',
        'brand': 'Apple',
        'category': 'Electronics',
        'price': 599.99,
        'countInStock': 7,
        'rating': 4.0,
        'numReviews': 8,
    },
    {
        '_id': '3',
        'name': 'Cannon EOS 80D DSLR Camera',
        'image': `${baseImagePath}/camera.jpeg`,
        'description': 'Canon EOS 80D DSLR Camera with 18-135mm STM Lens, 24.2MP, Dual Pixel CMOS AF, Full HD Video Recording, Wi-Fi and NFC Enabled',
        'brand': 'Cannon',
        'category': 'Electronics',
        'price': 929.99,
        'countInStock': 5,
        'rating': 3.5,
        'numReviews': 12,
    },
    {
        '_id': '4',
        'name': 'Sony Playstation 5 Console',
        'image': `${baseImagePath}/playstation.jpeg`,
        'description': 'The PS5 console unleashes new gaming possibilities that you never anticipated. Experience lightning-fast loading with an ultra-high-speed SSD and immerse yourself in worlds with incredible graphics and experience new PS5 features.',
        'brand': 'Sony',
        'category': 'Electronics',
        'price': 499.99,
        'countInStock': 11,
        'rating': 4.8,
        'numReviews': 12,
    },
    {
        '_id': '5',
        'name': 'Logitech G-Series Gaming Mouse',
        'image': `${baseImagePath}/mouse.jpeg`,
        'description': 'Logitech G-Series Gaming Mouse with customizable RGB lighting, programmable buttons.',
        'brand': 'Logitech',
        'category': 'Electronics',
        'price': 49.99,
        'countInStock': 15,
        'rating': 4.2,
        'numReviews': 10,
    },
    {
        '_id': '6',
        'name': 'Alexa Echo Dot (4th Gen)',
        'image': `${baseImagePath}/alexa.jpeg`,
        'description': 'Alexa Echo Dot (4th Gen) with improved sound quality, voice control for smart home devices, and built-in clock.',
        'brand': 'Amazon',
        'category': 'Electronics',
        'price': 199.99,
        'countInStock': 3,
        'rating': 4.7,
        'numReviews': 20,
    }
]

export default products;
