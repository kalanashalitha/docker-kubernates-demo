package demo.kafka;


import com.google.common.collect.Lists;
import com.twitter.hbc.ClientBuilder;
import com.twitter.hbc.core.Client;
import com.twitter.hbc.core.Constants;
import com.twitter.hbc.core.Hosts;
import com.twitter.hbc.core.HttpHosts;
import com.twitter.hbc.core.endpoint.StatusesFilterEndpoint;
import com.twitter.hbc.core.processor.StringDelimitedProcessor;
import com.twitter.hbc.httpclient.auth.Authentication;
import com.twitter.hbc.httpclient.auth.OAuth1;
import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Properties;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

public class TwitterClient {

    static Logger logger = LoggerFactory.getLogger(TwitterClient.class);

    public static void main(String[] args) {
        new TwitterClient().run();
    }

    void run() {
        /**
         * Set up your blocking queues: Be sure to size these properly based on expected TPS of your stream
         */
        BlockingQueue<String> msgQueue = new LinkedBlockingQueue<String>(10);
        Client hosebirdClient = createTwitterClient(msgQueue);
        KafkaProducer<String, String> producer = createProducer();
        hosebirdClient.connect();

        while (!hosebirdClient.isDone()) {
            String msg = null;
            try {
                msg = msgQueue.poll(5, TimeUnit.SECONDS);
            } catch (InterruptedException e) {
                e.printStackTrace();
                hosebirdClient.stop();
            }
            if (null != msg) {
                logger.info("message : {}", msg);
                ProducerRecord<String, String> producerRecord = new ProducerRecord<>("twitter_tweets", null,
                        msg);
                producer.send(producerRecord, (metadata, exception) -> {
                    if (null == exception) {
                        logger.info("topic: {}", metadata.topic());
                        logger.info("partition: {}", metadata.partition());
                        logger.info("offset: {}", metadata.offset());
                    } else {
                        logger.error("error occurred: ", exception);
                    }
                });
            }
        }
    }

    Client createTwitterClient(BlockingQueue<String> msgQueue) {
        String consumerKey = "T0zTEYsk2Y5OaZjNPjPrCQoef";
        String consumerSecret = "UBNPqdV4sYsPyxaGr0GrhPr09NWjLyi4eeeYjXQgKYNWoPhVJf";
        String token = "1256816384610361350-f7a1AwpCJFKO11m0qosV5b5ZzuTf2c";
        String secret = "xlVZIrrAmVrXJ48lzaXX9nHPvzYE3ebc9uypAGbnkodIp";

        /**
         * Declare the host you want to connect to, the endpoint, and authentication (basic auth or oauth)
         */
        Hosts hosebirdHosts = new HttpHosts(Constants.STREAM_HOST);
        StatusesFilterEndpoint hosebirdEndpoint = new StatusesFilterEndpoint();
        // Optional: set up some followings and track terms
        //List<Long> followings = Lists.newArrayList(1234L, 566788L);
        List<String> terms = Lists.newArrayList("sri lanka");
        //hosebirdEndpoint.followings(followings);
        hosebirdEndpoint.trackTerms(terms);

        // These secrets should be read from a config file
        Authentication hosebirdAuth = new OAuth1(consumerKey, consumerSecret, token, secret);

        ClientBuilder builder = new ClientBuilder()
                .name("Hosebird-Client-01")                              // optional: mainly for the logs
                .hosts(hosebirdHosts)
                .authentication(hosebirdAuth)
                .endpoint(hosebirdEndpoint)
                .processor(new StringDelimitedProcessor(msgQueue));
        //.eventMessageQueue(eventQueue);                          // optional: use this if you want to process client events

        return builder.build();//Client hosebirdClient = builder.build();

    }

    KafkaProducer<String, String> createProducer() {
        String bootstrapServers = "127.0.0.1:9092";
        Properties properties = new Properties();
        properties.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        properties.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        //creating a safe producer
        properties.setProperty(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG,"true");
        properties.setProperty(ProducerConfig.ACKS_CONFIG,"all");
        properties.setProperty(ProducerConfig.RETRIES_CONFIG,Integer.toString(Integer.MAX_VALUE));
        properties.setProperty(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION,"5");

        //kafka producer
        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);
        return producer;
    }
}
