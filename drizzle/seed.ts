import { config } from 'dotenv';
import { eq, and } from 'drizzle-orm';

import * as schema from '../lib/schema';
import { db, pool } from '../lib/db';

config({ path: '.env' });

async function main() {
  try {
    console.log('🌱 Starting hostel seed...');

    // Clear existing data (optional, for a clean slate)
    await db.delete(schema.hostelOptions);
    await db.delete(schema.hostelImages);
    await db.delete(schema.ratings);
    await db.delete(schema.comments);
    await db.delete(schema.hostels);
    await db.delete(schema.categoryOptionValues);
    await db.delete(schema.categories);
    await db.delete(schema.users);

    console.log('🗑️  Cleared existing data');

    // Seed Users (for testing purposes)
    const [testUser] = await db.insert(schema.users).values({
      userRole: 'admin',
      firebaseUid: 'test-admin-uid',
      displayName: 'Test Admin'
    }).returning();

    console.log('👤 Created test user');

    // Seed Categories
    const [amenitiesCat] = await db.insert(schema.categories).values({ category: 'Amenities' }).returning();
    const [roomTypeCat] = await db.insert(schema.categories).values({ category: 'Room Type' }).returning();
    const [locationTypeCat] = await db.insert(schema.categories).values({ category: 'Location Type' }).returning();
    const [priceRangeCat] = await db.insert(schema.categories).values({ category: 'Price Range' }).returning();
    const [atmosphereCat] = await db.insert(schema.categories).values({ category: 'Atmosphere' }).returning();

    console.log('📂 Created categories');

    // Seed Category Options
    const amenityOptions = [
      { categoryId: amenitiesCat.categoryId, optionName: 'Free WiFi' },
      { categoryId: amenitiesCat.categoryId, optionName: 'Kitchen' },
      { categoryId: amenitiesCat.categoryId, optionName: 'Laundry' },
      { categoryId: amenitiesCat.categoryId, optionName: 'Garden/Terrace' },
      { categoryId: amenitiesCat.categoryId, optionName: 'BBQ Area' },
      { categoryId: amenitiesCat.categoryId, optionName: 'Tour Desk' },
      { categoryId: amenitiesCat.categoryId, optionName: 'Bike Rental' },
      { categoryId: amenitiesCat.categoryId, optionName: 'Luggage Storage' },
    ];

    const roomTypeOptions = [
      { categoryId: roomTypeCat.categoryId, optionName: 'Dormitory' },
      { categoryId: roomTypeCat.categoryId, optionName: 'Private Room' },
      { categoryId: roomTypeCat.categoryId, optionName: 'Mixed Dorm' },
      { categoryId: roomTypeCat.categoryId, optionName: 'Double Room' },
      { categoryId: roomTypeCat.categoryId, optionName: 'Female Only Dorm' },
      { categoryId: roomTypeCat.categoryId, optionName: 'Male Only Dorm' },
    ];

    const locationTypeOptions = [
      { categoryId: locationTypeCat.categoryId, optionName: 'City Center' },
      { categoryId: locationTypeCat.categoryId, optionName: 'Mountain View' },
      { categoryId: locationTypeCat.categoryId, optionName: 'Beachfront' },
      { categoryId: locationTypeCat.categoryId, optionName: 'Business District' },
      { categoryId: locationTypeCat.categoryId, optionName: 'Historic District' },
      { categoryId: locationTypeCat.categoryId, optionName: 'Airport Area' },
    ];

    const priceRangeOptions = [
      { categoryId: priceRangeCat.categoryId, optionName: 'Economy ($25-50)' },
      { categoryId: priceRangeCat.categoryId, optionName: 'Mid-range ($50-100)' },
      { categoryId: priceRangeCat.categoryId, optionName: 'Premium ($100-200)' },
      { categoryId: priceRangeCat.categoryId, optionName: 'Luxury ($200+)' },
    ];

    const atmosphereOptions = [
      { categoryId: atmosphereCat.categoryId, optionName: 'Party/Social' },
      { categoryId: atmosphereCat.categoryId, optionName: 'Quiet/Relaxed' },
      { categoryId: atmosphereCat.categoryId, optionName: 'Backpacker' },
      { categoryId: atmosphereCat.categoryId, optionName: 'Digital Nomad' },
      { categoryId: atmosphereCat.categoryId, optionName: 'Traditional' },
      { categoryId: atmosphereCat.categoryId, optionName: 'Family Friendly' },
    ];

    await db.insert(schema.categoryOptionValues).values([
      ...amenityOptions, 
      ...roomTypeOptions, 
      ...locationTypeOptions, 
      ...priceRangeOptions, 
      ...atmosphereOptions
    ]);

    console.log('🏷️  Created category options');

    // Helper function to get option ID by category name and option name
    async function getOptionId(categoryName: string, optionName: string): Promise<number | undefined> {
      const category = await db.query.categories.findFirst({
        where: eq(schema.categories.category, categoryName)
      });
      if (!category) return undefined;

      const option = await db.query.categoryOptionValues.findFirst({
        where: and(
          eq(schema.categoryOptionValues.categoryId, category.categoryId),
          eq(schema.categoryOptionValues.optionName, optionName)
        )
      });
      return option?.optionId;
    }

    // Seed Sample Hostels
    const hostelsData = [
      {
        hostelName: "Backpacker's Paradise",
        hostelDescription: "A vibrant hostel in the heart of the city, perfect for budget travelers looking to meet fellow adventurers. Features a lively common room, free breakfast, and organized tours.",
        location: "https://maps.google.com/?q=123+Main+St+City+Center",
        address: "123 Main Street, City Center, 12345",
        phoneNumber: "+1 555 123 4567",
        email: "info@backpackersparadise.com",
        website: "https://www.backpackersparadise.com",
        priceRange: "$25-50",
        categories: [
          { categoryName: 'Amenities', optionName: 'Free WiFi' },
          { categoryName: 'Room Type', optionName: 'Dormitory' },
          { categoryName: 'Location Type', optionName: 'City Center' },
          { categoryName: 'Price Range', optionName: 'Economy ($25-50)' },
          { categoryName: 'Atmosphere', optionName: 'Party/Social' }
        ]
      },
      {
        hostelName: "Mountain View Lodge",
        hostelDescription: "Peaceful hostel with stunning mountain views. Perfect for nature lovers and those seeking a quiet retreat. Features hiking trails, garden, and cozy common areas.",
        location: "https://maps.google.com/?q=456+Mountain+Rd+Scenic+View",
        address: "456 Mountain Road, Scenic View, 67890",
        phoneNumber: "+1 555 987 6543",
        email: "hello@mountainviewlodge.com",
        website: "https://www.mountainviewlodge.com",
        priceRange: "$50-100",
        categories: [
          { categoryName: 'Amenities', optionName: 'Garden/Terrace' },
          { categoryName: 'Room Type', optionName: 'Private Room' },
          { categoryName: 'Location Type', optionName: 'Mountain View' },
          { categoryName: 'Price Range', optionName: 'Mid-range ($50-100)' },
          { categoryName: 'Atmosphere', optionName: 'Quiet/Relaxed' }
        ]
      },
      {
        hostelName: "Beachside Bunkhouse",
        hostelDescription: "Steps away from the beach, this hostel offers the perfect blend of beach life and social atmosphere. Features beach access, surfboard rentals, and beachfront BBQ area.",
        location: "https://maps.google.com/?q=789+Beach+Ave+Coastal+Town",
        address: "789 Beach Avenue, Coastal Town, 11111",
        phoneNumber: "+1 555 456 7890",
        email: "stay@beachsidebunkhouse.com",
        website: "https://www.beachsidebunkhouse.com",
        priceRange: "$30-60",
        categories: [
          { categoryName: 'Amenities', optionName: 'BBQ Area' },
          { categoryName: 'Room Type', optionName: 'Mixed Dorm' },
          { categoryName: 'Location Type', optionName: 'Beachfront' },
          { categoryName: 'Price Range', optionName: 'Economy ($25-50)' },
          { categoryName: 'Atmosphere', optionName: 'Backpacker' }
        ]
      }
    ];

    for (const hostelData of hostelsData) {
      // Insert hostel
      const [newHostel] = await db.insert(schema.hostels).values({
        hostelName: hostelData.hostelName,
        hostelDescription: hostelData.hostelDescription,
        location: hostelData.location,
        address: hostelData.address,
        phoneNumber: hostelData.phoneNumber,
        email: hostelData.email,
        website: hostelData.website,
        priceRange: hostelData.priceRange,
        createdByUid: testUser.uid,
        isActive: true,
      }).returning();

      if (newHostel && newHostel.hostelId) {
        console.log(`🏨 Created hostel: ${hostelData.hostelName}`);

        // Link hostel to categories and options
        for (const category of hostelData.categories) {
          const optionId = await getOptionId(category.categoryName, category.optionName);
          if (optionId) {
            const cat = await db.query.categories.findFirst({
              where: eq(schema.categories.category, category.categoryName)
            });
            if (cat) {
              await db.insert(schema.hostelOptions).values({
                hostelId: newHostel.hostelId,
                categoryId: cat.categoryId,
                optionId: optionId,
              });
            }
          }
        }

        // Add some sample ratings
        await db.insert(schema.ratings).values({
          hostelId: newHostel.hostelId,
          userId: testUser.uid,
          overallRating: "4.5",
        });

        // Add some sample comments
        await db.insert(schema.comments).values({
          hostelId: newHostel.hostelId,
          userId: testUser.uid,
          commentText: `Great experience at ${hostelData.hostelName}! Highly recommended.`,
          userName: 'Test User',
          userEmail: 'test@example.com',
          isVerified: true,
        });
      }
    }

    console.log('✅ Hostel seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main(); 