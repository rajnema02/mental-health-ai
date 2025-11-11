const EventEmitter = require('events');

class MockIngestService extends EventEmitter {
  constructor() {
    super();
    this.locations = [
      { district: 'Kolar', geo: [77.4126, 23.2599] },
      { district: 'MP Nagar', geo: [77.4364, 23.2339] },
      { district: 'BHEL', geo: [77.4851, 23.2207] },
      { district: 'Arera Colony', geo: [77.4290, 23.2135] },
    ];
    this.captions = [
      { text: 'Final exams are killing me, I can\'t take this anymore.', img: 'https://example.com/images/exam.jpg' },
      { text: 'Another pointless day at work. So tired.', img: null },
      { text: 'I feel so alone, does anyone even care?', img: 'https://example.com/images/empty_room.jpg' },
      { text: 'Loving life! Everything is perfect!', img: 'https://example.com/images/pills.jpg' }, // Mismatch!
      { text: 'Just finished a great workout!', img: 'https://example.com/images/gym.jpg' },
    ];
  }

  getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  start() {
    console.log('Mock Ingest Service Started... (Emitting new public post every 10s)');
    setInterval(() => {
      const location = this.getRandomElement(this.locations);
      const post = this.getRandomElement(this.captions);

      const mockPost = {
        id: `mock_${new Date().getTime()}`,
        username: `user_${Math.floor(Math.random() * 9999)}`,
        caption: post.text,
        image_url: post.img,
        geo: {
          // Add a tiny bit of "fuzz" to the coordinates
          longitude: location.geo[0] + (Math.random() - 0.5) * 0.01,
          latitude: location.geo[1] + (Math.random() - 0.5) * 0.01,
        },
        location_district: location.district, // Raw district
        timestamp: new Date().toISOString(),
      };

      // Emit the 'new-post' event for the pipeline to catch
      this.emit('new-post', mockPost);

    }, 10000); // New post every 10 seconds
  }
}

// Export a single instance
module.exports = new MockIngestService();