package constant;

import java.util.ResourceBundle;

public class ResourceBO {
    public static String getKey(String key){
        return ResourceBundle.getBundle("database").getString(key);
    }
}
