
public class CheckInheritance {
	public static void main(String[] args) {
		Z myz = new Z();
		String res = myz.checkUser();
		System.out.println(res);
	}
}

class Z extends Y {

	@Override
	public Object getPrincipal() {
		return "admin1";
	}
}

abstract class Y implements myAuth {
	public String checkUser() {
		if (this.getPrincipal().equals("admin")) {
			return "Hello, admin";
		}
		return "Authentication error";
	}
}

interface myAuth {
	Object getPrincipal();
}
