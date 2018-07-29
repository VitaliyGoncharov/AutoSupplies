import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TryToRepeat {
	
	
	public static void main(String[] args) {
		/*S s = new S() {
			{
				add("apple");
				add("orange");
			}
		};*/
		/*S s = new S();
		String vals = s.viewAll();
		System.out.println(vals);*/
		
		dl customClass = new dl() {
			{
				info = "laks";
			}
		};
		customClass.getInfo();
	}
}

class dl {
	public static String info;
	
	public static String getInfo() {
		return info;
	}
}

class S {
	
	private Map<String, Object> myArray = new HashMap();
	
	public void add(String newStr) {
		myArray.put("fruit", newStr);
	}
	
	public String viewAll() {
		StringBuilder sb = new StringBuilder();
		for (Map.Entry<String, Object> entry : myArray.entrySet()) {
			sb.append(entry.getKey() + ":" + entry.getValue() + ",\n");
		}
		
		return sb.toString();
	}
}

class C {
	public List<String> getList() {
		List<String> auth = new ArrayList<String>() {
			{
				add("String1");
			}
		};
		auth.add("str");
		
		return new ArrayList<String>() {
			{add("new");}
		};
	}
}
