package disaster.loss.domain;

import java.io.Serializable;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;


/**
 * A FileData.
 */
@Entity
@Table(name = "file_data")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FileData extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "file_id", updatable = false, nullable = false)
	private String fileId;

	private String name;

	@Column(name = "content_type")
	private String contentType;

	@Column(name = "disaster_id")
	private String disasterId;

	private Long size;

	@Lob
	private byte[] data;

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getDisasterId() {
		return disasterId;
	}

	public void setDisasterId(String disasterId) {
		this.disasterId = disasterId;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	// prettier-ignore
	@Override
	public String toString() {
		return "FileData [fileId=" + fileId + ", name=" + name + ", contentType=" + contentType + ", disasterId="
				+ disasterId + ", size=" + size + ", data=" + Arrays.toString(data) + "]";
	}


}
