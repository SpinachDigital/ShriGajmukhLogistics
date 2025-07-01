<?php
session_start();

// Database configuration
$host = $_ENV['PGHOST'] ?? 'localhost';
$dbname = $_ENV['PGDATABASE'] ?? 'replit';
$username = $_ENV['PGUSER'] ?? 'replit';
$password = $_ENV['PGPASSWORD'] ?? '';
$port = $_ENV['PGPORT'] ?? '5432';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    $pdo = null;
}

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'contact':
                handleContactSubmission($pdo);
                break;
            case 'quote':
                handleQuoteSubmission($pdo);
                break;

        }
    }
    exit;
}

function handleContactSubmission($pdo) {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $service = trim($_POST['service'] ?? '');
    $message = trim($_POST['message'] ?? '');
    
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Required fields are missing']);
        return;
    }
    
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO contact_inquiries (name, email, phone, service, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
            $stmt->execute([$name, $email, $phone, $service, $message]);
            echo json_encode(['success' => true, 'message' => 'Contact inquiry submitted successfully']);
        } catch(PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Database error occurred']);
        }
    } else {
        echo json_encode(['success' => true, 'message' => 'Contact inquiry received (demo mode)']);
    }
}

function handleQuoteSubmission($pdo) {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $service = trim($_POST['service'] ?? '');
    $origin = trim($_POST['origin'] ?? '');
    $destination = trim($_POST['destination'] ?? '');
    $vehicleType = trim($_POST['vehicleType'] ?? '');
    $quantity = trim($_POST['quantity'] ?? '');
    $additionalInfo = trim($_POST['additionalInfo'] ?? '');
    
    if (empty($name) || empty($email) || empty($service) || empty($origin) || empty($destination)) {
        echo json_encode(['success' => false, 'message' => 'Required fields are missing']);
        return;
    }
    
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO quote_requests (name, email, phone, service, origin, destination, vehicle_type, quantity, additional_info, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
            $stmt->execute([$name, $email, $phone, $service, $origin, $destination, $vehicleType, $quantity, $additionalInfo]);
            echo json_encode(['success' => true, 'message' => 'Quote request submitted successfully']);
        } catch(PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Database error occurred']);
        }
    } else {
        echo json_encode(['success' => true, 'message' => 'Quote request received (demo mode)']);
    }
}



// Company constants
$COMPANY_INFO = [
    'name' => 'Shri Gajmukh Motors Pvt. Ltd.',
    'tagline' => 'Your Trusted Logistics Partner Since 1967',
    'phone' => '+91 98765 43210',
    'email' => 'info@shrigajmukhmotors.com',
    'address' => 'Mumbai, Maharashtra, India',
    'established' => '1967',
    'drivers' => '500+'
];

$SERVICES = [
    [
        'title' => 'Freight Forwarding',
        'description' => 'Comprehensive freight forwarding services with global reach and local expertise.',
        'icon' => 'truck'
    ],
    [
        'title' => 'Project Cargo & ODC',
        'description' => 'Specialized handling of oversized and over-dimensional cargo with precision.',
        'icon' => 'package'
    ],
    [
        'title' => 'Break Bulk & Heavy Lift',
        'description' => 'Expert handling of heavy machinery and break bulk cargo operations.',
        'icon' => 'crane'
    ],
    [
        'title' => 'Car Carrier Services',
        'description' => 'Safe and secure transportation of vehicles with specialized car carriers.',
        'icon' => 'car'
    ],
    [
        'title' => 'Curtain Carriers',
        'description' => 'Flexible curtain-sided trailers for easy loading and weather protection.',
        'icon' => 'shield'
    ],
    [
        'title' => 'Tractor Transportation',
        'description' => 'Specialized transportation services for tractors and agricultural equipment.',
        'icon' => 'tractor'
    ],
    [
        'title' => '2-Wheeler Carriers',
        'description' => 'Dedicated carriers for motorcycles and two-wheeler transportation.',
        'icon' => 'bike'
    ],
    [
        'title' => 'Logistics Solutions',
        'description' => 'End-to-end logistics solutions tailored to your business needs.',
        'icon' => 'logistics'
    ]
];

$HERO_SLIDES = [
    [
        'title' => 'Professional Logistics Solutions',
        'subtitle' => 'Trusted transportation services since 1967',
        'image' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&h=800&q=80'
    ],
    [
        'title' => '500+ Expert Drivers',
        'subtitle' => 'Experienced professionals ensuring safe delivery',
        'image' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&h=800&q=80'
    ],
    [
        'title' => 'Nationwide Coverage',
        'subtitle' => 'Connecting every corner of India with reliable service',
        'image' => 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1920&h=800&q=80'
    ]
];

$GALLERY_IMAGES = [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&h=400&q=80',
    'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&h=400&q=80'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $COMPANY_INFO['name']; ?> - Professional Logistics Services</title>
    <meta name="description" content="<?php echo $COMPANY_INFO['name']; ?> - Your trusted logistics partner since <?php echo $COMPANY_INFO['established']; ?>. Professional freight forwarding, car carriers, and transportation services across India.">
    
    <!-- Open Graph tags -->
    <meta property="og:title" content="<?php echo $COMPANY_INFO['name']; ?> - Professional Logistics Services">
    <meta property="og:description" content="Trusted logistics partner since <?php echo $COMPANY_INFO['established']; ?> with <?php echo $COMPANY_INFO['drivers']; ?> professional drivers.">
    <meta property="og:type" content="website">
    
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-blue: #0c256f;
            --charcoal: #2d3748;
            --silver-grey: #a0aec0;
        }
        
        .bg-electric-blue { background-color: var(--primary-blue); }
        .text-electric-blue { color: var(--primary-blue); }
        .border-electric-blue { border-color: var(--primary-blue); }
        .bg-charcoal { background-color: var(--charcoal); }
        .text-charcoal { color: var(--charcoal); }
        .text-silver-grey { color: var(--silver-grey); }
        
        .hero-slider {
            background: linear-gradient(rgba(12, 37, 111, 0.7), rgba(12, 37, 111, 0.7));
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .smooth-scroll {
            scroll-behavior: smooth;
        }
        
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        
        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        

    </style>
</head>
<body class="smooth-scroll">
    <!-- Header -->
    <header class="bg-white shadow-lg fixed w-full z-50">
        <nav class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <img src="attached_assets/output-onlinepngtools-3-AzG7WyOJjacnoKZ2-Photoroom_1750422520317.png" alt="<?php echo $COMPANY_INFO['name']; ?>" class="h-12 w-auto">
                    <div class="hidden md:block">
                        <h1 class="text-xl font-bold text-charcoal"><?php echo $COMPANY_INFO['name']; ?></h1>
                        <p class="text-sm text-silver-grey"><?php echo $COMPANY_INFO['tagline']; ?></p>
                    </div>
                </div>
                
                <div class="hidden lg:flex space-x-8">
                    <a href="#home" class="text-charcoal hover:text-electric-blue transition-colors font-medium">Home</a>
                    <a href="#about" class="text-charcoal hover:text-electric-blue transition-colors font-medium">About</a>
                    <a href="#services" class="text-charcoal hover:text-electric-blue transition-colors font-medium">Services</a>
                    <a href="#gallery" class="text-charcoal hover:text-electric-blue transition-colors font-medium">Gallery</a>
                    <a href="#contact" class="text-charcoal hover:text-electric-blue transition-colors font-medium">Contact</a>

                </div>
                
                <button onclick="openQuoteModal()" class="bg-electric-blue text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                    Get Quote
                </button>
                
                <!-- Mobile menu button -->
                <button id="mobile-menu-btn" class="lg:hidden text-charcoal">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>
            
            <!-- Mobile menu -->
            <div id="mobile-menu" class="lg:hidden hidden mt-4 pb-4">
                <a href="#home" class="block py-2 text-charcoal hover:text-electric-blue">Home</a>
                <a href="#about" class="block py-2 text-charcoal hover:text-electric-blue">About</a>
                <a href="#services" class="block py-2 text-charcoal hover:text-electric-blue">Services</a>
                <a href="#gallery" class="block py-2 text-charcoal hover:text-electric-blue">Gallery</a>
                <a href="#contact" class="block py-2 text-charcoal hover:text-electric-blue">Contact</a>

            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero-slider min-h-screen flex items-center relative overflow-hidden pt-20">
        <div id="hero-bg" class="absolute inset-0 bg-cover bg-center transition-all duration-1000" style="background-image: url('<?php echo $HERO_SLIDES[0]['image']; ?>')"></div>
        <div class="absolute inset-0 bg-electric-blue bg-opacity-70"></div>
        
        <div class="container mx-auto px-4 relative z-10">
            <div class="max-w-4xl">
                <h1 id="hero-title" class="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    <?php echo $HERO_SLIDES[0]['title']; ?>
                </h1>
                <p id="hero-subtitle" class="text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl">
                    <?php echo $HERO_SLIDES[0]['subtitle']; ?>
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <button onclick="openQuoteModal()" class="bg-white text-electric-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Get Instant Quote
                    </button>
                    <a href="#services" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-electric-blue transition-colors text-center">
                        Our Services
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Hero navigation -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            <?php for($i = 0; $i < count($HERO_SLIDES); $i++): ?>
                <button onclick="changeSlide(<?php echo $i; ?>)" class="hero-dot w-3 h-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-100 transition-all" data-slide="<?php echo $i; ?>"></button>
            <?php endfor; ?>
        </div>
    </section>

    <!-- Welcome Section -->
    <section id="about" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Welcome to <?php echo $COMPANY_INFO['name']; ?></h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Since <?php echo $COMPANY_INFO['established']; ?>, we have been India's most trusted logistics partner, providing comprehensive transportation solutions with a fleet managed by over <?php echo $COMPANY_INFO['drivers']; ?> professional drivers.
                </p>
                <div class="w-24 h-1 bg-electric-blue mx-auto mt-8"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div class="text-center">
                    <div class="bg-electric-blue text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-truck text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-charcoal mb-4">58+ Years</h3>
                    <p class="text-gray-600">Of Excellence in Logistics</p>
                </div>
                
                <div class="text-center">
                    <div class="bg-electric-blue text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-users text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-charcoal mb-4"><?php echo $COMPANY_INFO['drivers']; ?></h3>
                    <p class="text-gray-600">Professional Drivers</p>
                </div>
                
                <div class="text-center">
                    <div class="bg-electric-blue text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-map-marked-alt text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-charcoal mb-4">Pan India</h3>
                    <p class="text-gray-600">Network Coverage</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Our Services</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Comprehensive logistics solutions tailored to meet your transportation needs with precision and reliability.
                </p>
                <div class="w-24 h-1 bg-electric-blue mx-auto mt-8"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <?php foreach($SERVICES as $service): ?>
                    <div class="card-hover bg-white border border-gray-200 rounded-lg p-6 text-center">
                        <div class="bg-electric-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-<?php echo $service['icon']; ?> text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-charcoal mb-4"><?php echo $service['title']; ?></h3>
                        <p class="text-gray-600 mb-6"><?php echo $service['description']; ?></p>
                        <button onclick="openQuoteModal()" class="text-electric-blue font-semibold hover:underline">
                            Get Quote <i class="fas fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Photo Gallery -->
    <section id="gallery" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Photo Gallery</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Showcasing our fleet, operations, and commitment to excellence in logistics services.
                </p>
                <div class="w-24 h-1 bg-electric-blue mx-auto mt-8"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach($GALLERY_IMAGES as $index => $image): ?>
                    <div class="card-hover cursor-pointer" onclick="openGalleryModal('<?php echo $image; ?>')">
                        <img src="<?php echo $image; ?>" alt="Gallery Image <?php echo $index + 1; ?>" class="w-full h-64 object-cover rounded-lg">
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>



    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold text-charcoal mb-6">Contact Us</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Get in touch with our logistics experts for personalized transportation solutions.
                </p>
                <div class="w-24 h-1 bg-electric-blue mx-auto mt-8"></div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div>
                    <h3 class="text-2xl font-bold text-charcoal mb-6">Get In Touch</h3>
                    <div class="space-y-6">
                        <div class="flex items-center space-x-4">
                            <div class="bg-electric-blue text-white w-12 h-12 rounded-full flex items-center justify-center">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-charcoal">Phone</h4>
                                <p class="text-gray-600"><?php echo $COMPANY_INFO['phone']; ?></p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-4">
                            <div class="bg-electric-blue text-white w-12 h-12 rounded-full flex items-center justify-center">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-charcoal">Email</h4>
                                <p class="text-gray-600"><?php echo $COMPANY_INFO['email']; ?></p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-4">
                            <div class="bg-electric-blue text-white w-12 h-12 rounded-full flex items-center justify-center">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-charcoal">Address</h4>
                                <p class="text-gray-600"><?php echo $COMPANY_INFO['address']; ?></p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <form id="contact-form" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                                <input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent">
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input type="tel" name="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Service</label>
                                <select name="service" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent">
                                    <option value="">Select a service</option>
                                    <?php foreach($SERVICES as $service): ?>
                                        <option value="<?php echo $service['title']; ?>"><?php echo $service['title']; ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                            <textarea name="message" rows="4" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent" placeholder="Tell us about your transportation needs..."></textarea>
                        </div>
                        <button type="submit" class="w-full bg-electric-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                            Send Message <i class="fas fa-paper-plane ml-2"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-charcoal text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="md:col-span-2">
                    <div class="flex items-center space-x-4 mb-6">
                        <img src="attached_assets/output-onlinepngtools-3-AzG7WyOJjacnoKZ2-Photoroom_1750422520317.png" alt="<?php echo $COMPANY_INFO['name']; ?>" class="h-12 w-auto">
                        <div>
                            <h3 class="text-xl font-bold"><?php echo $COMPANY_INFO['name']; ?></h3>
                            <p class="text-gray-400"><?php echo $COMPANY_INFO['tagline']; ?></p>
                        </div>
                    </div>
                    <p class="text-gray-400 max-w-md">
                        Leading logistics provider in India since <?php echo $COMPANY_INFO['established']; ?>, offering comprehensive transportation solutions with a commitment to excellence and reliability.
                    </p>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="#home" class="text-gray-400 hover:text-white transition-colors">Home</a></li>
                        <li><a href="#about" class="text-gray-400 hover:text-white transition-colors">About</a></li>
                        <li><a href="#services" class="text-gray-400 hover:text-white transition-colors">Services</a></li>
                        <li><a href="#contact" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4">Contact Info</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><i class="fas fa-phone mr-2"></i><?php echo $COMPANY_INFO['phone']; ?></li>
                        <li><i class="fas fa-envelope mr-2"></i><?php echo $COMPANY_INFO['email']; ?></li>
                        <li><i class="fas fa-map-marker-alt mr-2"></i><?php echo $COMPANY_INFO['address']; ?></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-600 mt-8 pt-8 text-center">
                <p class="text-gray-400">
                    © <?php echo date('Y'); ?> <?php echo $COMPANY_INFO['name']; ?>. All rights reserved.
                </p>
            </div>
        </div>
    </footer>

    <!-- Quote Modal -->
    <div id="quote-modal" class="modal">
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-charcoal">Request a Quote</h2>
                <button onclick="closeQuoteModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <form id="quote-form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                        <input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                        <input type="tel" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Service *</label>
                        <select name="service" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent">
                            <option value="">Select a service</option>
                            <?php foreach($SERVICES as $service): ?>
                                <option value="<?php echo $service['title']; ?>"><?php echo $service['title']; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Origin *</label>
                        <input type="text" name="origin" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent" placeholder="Pick-up location">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
                        <input type="text" name="destination" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent" placeholder="Drop-off location">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Vehicle/Cargo Type</label>
                        <input type="text" name="vehicleType" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent" placeholder="e.g., Cars, Trucks, Machinery">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                        <input type="number" name="quantity" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent" placeholder="Number of items">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                    <textarea name="additionalInfo" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent" placeholder="Any special requirements or timeline..."></textarea>
                </div>
                <div class="flex space-x-4">
                    <button type="button" onclick="closeQuoteModal()" class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" class="flex-1 bg-electric-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                        Submit Quote Request
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Gallery Modal -->
    <div id="gallery-modal" class="modal">
        <div class="relative max-w-4xl mx-4">
            <button onclick="closeGalleryModal()" class="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors z-10">
                <i class="fas fa-times text-xl"></i>
            </button>
            <img id="gallery-modal-image" src="" alt="Gallery Image" class="w-full h-auto rounded-lg">
        </div>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full transition-transform duration-300">
        <div class="flex items-center space-x-2">
            <i class="fas fa-check-circle"></i>
            <span id="toast-message">Message sent successfully!</span>
        </div>
    </div>

    <script>
        // Hero slider data
        const heroSlides = <?php echo json_encode($HERO_SLIDES); ?>;
        let currentSlide = 0;
        
        // Hero slider functionality
        function changeSlide(index) {
            currentSlide = index;
            const slide = heroSlides[index];
            
            document.getElementById('hero-bg').style.backgroundImage = `url('${slide.image}')`;
            document.getElementById('hero-title').textContent = slide.title;
            document.getElementById('hero-subtitle').textContent = slide.subtitle;
            
            // Update dots
            document.querySelectorAll('.hero-dot').forEach((dot, i) => {
                dot.style.backgroundColor = i === index ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)';
            });
        }
        
        // Auto-advance hero slider
        setInterval(() => {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            changeSlide(currentSlide);
        }, 5000);
        
        // Mobile menu toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    document.getElementById('mobile-menu').classList.add('hidden');
                }
            });
        });
        
        // Quote Modal
        function openQuoteModal() {
            document.getElementById('quote-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeQuoteModal() {
            document.getElementById('quote-modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Gallery Modal
        function openGalleryModal(imageSrc) {
            document.getElementById('gallery-modal-image').src = imageSrc;
            document.getElementById('gallery-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeGalleryModal() {
            document.getElementById('gallery-modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Toast notification
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            
            toastMessage.textContent = message;
            toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ${
                type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`;
            
            // Show toast
            toast.style.transform = 'translateY(0)';
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.style.transform = 'translateY(100%)';
            }, 3000);
        }
        
        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            formData.append('action', 'contact');
            
            fetch('', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast(data.message, 'success');
                    this.reset();
                } else {
                    showToast(data.message, 'error');
                }
            })
            .catch(error => {
                showToast('An error occurred. Please try again.', 'error');
            });
        });
        
        // Quote form submission
        document.getElementById('quote-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            formData.append('action', 'quote');
            
            fetch('', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast(data.message, 'success');
                    this.reset();
                    closeQuoteModal();
                } else {
                    showToast(data.message, 'error');
                }
            })
            .catch(error => {
                showToast('An error occurred. Please try again.', 'error');
            });
        });
        

        
        // Close modals when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                if (e.target.id === 'quote-modal') {
                    closeQuoteModal();
                } else if (e.target.id === 'gallery-modal') {
                    closeGalleryModal();
                }
            }
        });
        

    </script>
</body>
</html>