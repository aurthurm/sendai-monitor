package disaster.loss.service.impl;

import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Service
public class CasualtyImportServiceImpl {

	public void importCasualties() {
		String line = "";
		String splitBy = ",";
		try {
			// parsing a CSV file into BufferedReader class constructor
			BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\Dell\\Desktop\\csvDemo.csv"));
			while ((line = br.readLine()) != null)
			// returns a Boolean value
			{
				String[] employee = line.split(splitBy);
				// use comma as separator
				System.out.println("Emp[First Name=" + employee[1] + ", Last Name=" + employee[2] + ", Contact="
						+ employee[3] + ", City= " + employee[4] + "]");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
