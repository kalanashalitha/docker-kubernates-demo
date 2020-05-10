package demo.kafka;

import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;
import java.util.concurrent.ExecutionException;

public class ProducerDemo {
    private static Logger logger = LoggerFactory.getLogger(ProducerDemo.class);
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        String bootstrapServers = "127.0.0.1:9092";
        Properties properties = new Properties();
        properties.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,bootstrapServers);
        properties.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,StringSerializer.class.getName());

        //kafka producer
        KafkaProducer<String,String> producer = new KafkaProducer<>(properties);

        for (int i = 0; i < 10; i++) {
            String key =  "key "+Integer.toString(i);
            logger.info("Key: {}",key);
            ProducerRecord<String,String> producerRecord = new ProducerRecord<>("first_topic", key,
                    "msg "+i+" from java app");

            producer.send(producerRecord, new Callback() {
                @Override
                public void onCompletion(RecordMetadata metadata, Exception exception) {
                    if(null == exception){
                        logger.info("topic: {}",metadata.topic());
                        logger.info("partition: {}",metadata.partition());
                        logger.info("offset: {}",metadata.offset());
                    } else {
                        logger.error("error occurred: ",exception);
                    }
                }
            }).get();
        }
        producer.flush();

    }
}
