# 🐹 GTSDB (Golang Time Series Database)

A simple, efficient, and easy-to-use time series database designed for IoT and real-time applications.

## ✨ Key Features

- **Innovative Design**: Utilizes Write Ahead Log (WAL) for records, reducing IO and memory usage
- **High Performance**: 19,172 ns/op with in-memory-like speed and WAL-class durability
- **Memory Efficient**: As low as 6MB memory usage, perfect for IoT devices
- **Easy Integration**: Identical HTTP API and TCP interfaces using JSON
- **Built-in Streaming**: Real-time data subscriptions support
- **Analytics Ready**: Built-in support for data downsampling and aggregation
- **Cross-Platform**: Supports Windows, Linux/BSD, and macOS

## 🚀 Quick Start

1. Download the latest release from [GitHub Releases](https://github.com/abbychau/gtsdb/releases)
2. Run the GTSDB server
3. Start using either the HTTP API or TCP interface

## 📡 API Usage

### HTTP API Example

```json
// Write data
POST /
{
    "operation": "write",
    "key": "sensor1",
    "Write": {
        "Value": 32242424243333333333.3333,
        "Timestamp": 1617965210
    }
}

// Read data
POST /
{
    "operation": "read",
    "key": "sensor1",
    "Read": {
        "StartTime": 1617965210,
        "EndTime": 1617965211,
        "Downsample": 3
    }
}
```

### TCP Interface
Uses the same JSON format as HTTP API but over TCP connection.

## 📊 Performance

- 24 Concurrent operations
- 311,648 operations tested
- 19,172 ns/op
- 4,245 B/op
- 5 allocs/op

## 📚 Documentation

For detailed documentation, visit our [Documentation Page](https://gtsdb.abby.md/Documentation).

## 🤝 Commercial Support

For commercial support, please contact: [abbychau@gmail.com](mailto:abbychau@gmail.com)

## 📜 License

GTSDB is open-source software licensed under the MIT License.
