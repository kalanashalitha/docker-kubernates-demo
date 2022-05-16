package demo.kafka;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

public class ConsumerDemo {
    static Logger logger = LoggerFactory.getLogger(ConsumerDemo.class);

    public static void main(String[] args) {
        Properties properties = new Properties();
        properties.setProperty(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,"127.0.0.1:9092");
        properties.setProperty(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.setProperty(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,StringDeserializer.class.getName());
        properties.setProperty(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,"earliest");
        // properties.setProperty(ConsumerConfig.GROUP_ID_CONFIG,"second_group");

        // create consumer
        KafkaConsumer<String,String> consumer = new KafkaConsumer<String, String>(properties);

        // seek and assign
        TopicPartition topicPartitionToReadFrom = new TopicPartition("first_topic",2);
        long offestToReadFrom = 1L;
        consumer.assign(Arrays.asList(topicPartitionToReadFrom));
        consumer.seek(topicPartitionToReadFrom, offestToReadFrom);

        //subscribe
        //consumer.subscribe(Arrays.asList("first_topic"));

        while (true){
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(1000000));
            records.forEach(record -> {
                logger.info("partition: {}", record.partition());
                logger.info("offset: {}", record.offset());
                logger.info("key: {}", record.key());
                logger.info("msg: {}", record.value());
            });
        }
    }
}
