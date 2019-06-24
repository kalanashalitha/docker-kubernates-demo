package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;

import javax.annotation.Resource;

public class Example {

    // inject the actual template
//    @Autowired
//    private RedisTemplate<String, String> template;

    // inject the template as ListOperations
    // can also inject as Value, Set, ZSet, and HashOperations
    @Resource(name="redisTemplate")
    private StringRedisTemplate stringRedisTemplate;

    public void addLink(String key, String value) {
        stringRedisTemplate.opsForValue().set(key,value);
        // or use template directly
        //redisTemplate.boundListOps(userId).leftPush(url.toExternalForm());
    }

    public String getData(String key){
        return stringRedisTemplate.opsForValue().get(key);
    }
}