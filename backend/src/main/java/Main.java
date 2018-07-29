import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

class A
{
    private List<String> list = new ArrayList<String>() {
    	{add("item");}
    	};
 
    public List<String> getList()
    {
        return list;
    }
}
 
class B
{
    private List<String> list = new ArrayList<String>(){{add("item");}};
 
    public List<String> getList()
    {
        return Collections.unmodifiableList( list );
    }
}
 
/**
 * @author infinity
 *
 */
public class Main
{
    /**
     * @param 
     * args the command line arguments
     * 
     */
    public static void main(String[] args) throws Exception
    {
        A a = new A();
        System.out.println( Arrays.toString(a.getList().toArray()) );
        a.getList().add("new_item");
        System.out.println( Arrays.toString(a.getList().toArray()) );
 
        B b = new B();
        System.out.println( Arrays.toString(b.getList().toArray()) );
        b.getList().add("new_item");
        System.out.println( Arrays.toString(b.getList().toArray()) );
    }
}
