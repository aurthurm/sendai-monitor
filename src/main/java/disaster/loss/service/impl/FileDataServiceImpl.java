package disaster.loss.service.impl;

import disaster.loss.domain.FileData;
import disaster.loss.repository.FileDataRepository;
import disaster.loss.service.FileDataService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import java.io.IOException;


/**
 * Service Implementation for managing {@link FileData}.
 */
@Service
@Transactional
public class FileDataServiceImpl implements FileDataService {

    private final Logger log = LoggerFactory.getLogger(FileDataServiceImpl.class);

    private final FileDataRepository fileDataRepository;

    public FileDataServiceImpl(FileDataRepository fileDataRepository) {
        this.fileDataRepository = fileDataRepository;
    }

	/*
	 * @Override public FileData save(FileData fileData) {
	 * log.debug("Request to save FileData : {}", fileData); return
	 * fileDataRepository.save(fileData); }
	 */

    @Override
    public void save(MultipartFile file, String disasterId) throws IOException {
    	FileData fileEntity = new FileData();
        fileEntity.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        fileEntity.setContentType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setSize(file.getSize());
        fileEntity.setDisasterId(disasterId);

        fileDataRepository.save(fileEntity);
    }

    @Override
    public Optional<FileData> partialUpdate(FileData fileData) {
        log.debug("Request to partially update FileData : {}", fileData);

        return fileDataRepository
            .findById(fileData.getFileId())
            .map(existingFileData -> {
                if (fileData.getName() != null) {
                    existingFileData.setName(fileData.getName());
                }
                if (fileData.getContentType() != null) {
                    existingFileData.setContentType(fileData.getContentType());
                }
                if (fileData.getData() != null) {
                    existingFileData.setData(fileData.getData());
                }
                if (fileData.getDisasterId() != null) {
                    existingFileData.setDisasterId(fileData.getDisasterId());
                }
                if (fileData.getSize() != null) {
                    existingFileData.setSize(fileData.getSize());
                }

                return existingFileData;
            })
            .map(fileDataRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FileData> findAll(Pageable pageable) {
        log.debug("Request to get all FileData");
        return fileDataRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FileData> findOne(String id) {
        log.debug("Request to get FileData : {}", id);
        return fileDataRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete FileData : {}", id);
        fileDataRepository.deleteById(id);
    }
}
