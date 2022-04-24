package disaster.loss.web.rest;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import disaster.loss.domain.FileData;
import disaster.loss.repository.FileDataRepository;
import disaster.loss.service.FileDataService;
import disaster.loss.service.dto.FileResponse;
import disaster.loss.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;


/**
 * REST controller for managing {@link disaster.loss.domain.FileData}.
 */
@RestController
@RequestMapping("/api")
public class FileDataResource {

    private final Logger log = LoggerFactory.getLogger(FileDataResource.class);

    private static final String ENTITY_NAME = "fileData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FileDataService fileDataService;

    private final FileDataRepository fileDataRepository;

    public FileDataResource(FileDataService fileDataService, FileDataRepository fileDataRepository) {
        this.fileDataService = fileDataService;
        this.fileDataRepository = fileDataRepository;
    }

    /**
     * {@code POST  /file-data} : Create a new fileData.
     *
     * @param file the fileData to create.
     * @param disasterId the disater Id where this file belongs to.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fileData, or with status {@code 400 (Bad Request)} if the fileData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/file-data/{disasterId}")
    public ResponseEntity<String> upload(@PathVariable String disasterId, @RequestParam("file") MultipartFile file) {
        try {
        	fileDataService.save(file, disasterId);

            return ResponseEntity.status(HttpStatus.OK)
                                 .body(String.format("File uploaded successfully: %s", file.getOriginalFilename()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
        }
    }

    /**
     * {@code PATCH  /file-data/:fileId} : Partial updates given fields of an existing fileData, field will ignore if it is null
     *
     * @param fileId the id of the fileData to save.
     * @param fileData the fileData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fileData,
     * or with status {@code 400 (Bad Request)} if the fileData is not valid,
     * or with status {@code 404 (Not Found)} if the fileData is not found,
     * or with status {@code 500 (Internal Server Error)} if the fileData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/file-data/{fileId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FileData> partialUpdateFileData(
        @PathVariable(value = "fileId", required = false) final String fileId,
        @RequestBody FileData fileData
    ) throws URISyntaxException {
        log.debug("REST request to partial update FileData partially : {}, {}", fileId, fileData);
        if (fileData.getFileId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(fileId, fileData.getFileId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fileDataRepository.existsById(fileId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FileData> result = fileDataService.partialUpdate(fileData);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fileData.getFileId())
        );
    }

    /**
     * {@code GET  /file-data} : get all the fileData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fileData in body.
     */
    @GetMapping("/file-data")
    public List<FileResponse> list(@RequestParam String disasterId) {
        log.debug("GET file data for disaster with disasterId: {}", disasterId);
        return fileDataRepository.findByDisasterId(disasterId)
                          .stream()
                          .map(this::mapToFileResponse)
                          .collect(Collectors.toList());
    }

    private FileResponse mapToFileResponse(FileData fileEntity) {
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
                                                        .path("/files/")
                                                        .path(fileEntity.getFileId())
                                                        .toUriString();
        FileResponse fileResponse = new FileResponse();
        fileResponse.setId(fileEntity.getFileId());
        fileResponse.setName(fileEntity.getName());
        fileResponse.setData(fileEntity.getData());
        fileResponse.setContentType(fileEntity.getContentType());
        fileResponse.setSize(fileEntity.getSize());
        fileResponse.setUrl(downloadURL);

        return fileResponse;
    }

    /**
     * {@code GET  /file-data/:id} : get the "id" fileData.
     *
     * @param id the id of the fileData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fileData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/file-data/{id}")
    public ResponseEntity<FileData> getFileData(@PathVariable String id) {
        log.debug("REST request to get FileData : {}", id);
        Optional<FileData> fileData = fileDataService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fileData);
    }

    /**
     * {@code GET  /file-data/disasterId/:disasterId} : get the "id" fileData.
     *
     * @param disasterId the id of the fileData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fileData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/file-data/disasterId/{disasterId}")
    public List<FileResponse> listByDisasterId(@PathVariable String disasterId) {
        return fileDataRepository.findByDisasterId(disasterId)
                          .stream()
                          .map(this::mapToFileResponseByDisaster)
                          .collect(Collectors.toList());
    }

    private FileResponse mapToFileResponseByDisaster(FileData fileEntity) {
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
                                                        .path("/files/")
                                                        .path(fileEntity.getFileId())
                                                        .toUriString();
        FileResponse fileResponse = new FileResponse();
        fileResponse.setId(fileEntity.getFileId());
        fileResponse.setName(fileEntity.getName());
        fileResponse.setData(fileEntity.getData());
        fileResponse.setContentType(fileEntity.getContentType());
        fileResponse.setSize(fileEntity.getSize());
        fileResponse.setUrl(downloadURL);

        return fileResponse;
    }


    /**
     * {@code DELETE  /file-data/:id} : delete the "id" fileData.
     *
     * @param id the id of the fileData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/file-data/{id}")
    public ResponseEntity<Void> deleteFileData(@PathVariable String id) {
        log.debug("REST request to delete FileData : {}", id);
        fileDataService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

    @GetMapping("/get-one/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        Optional<FileData> fileEntityOptional = fileDataService.findOne(id);

        if (!fileEntityOptional.isPresent()) {
            return ResponseEntity.notFound()
                                 .build();
        }

        FileData fileEntity = fileEntityOptional.get();
        return ResponseEntity.ok()
                             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getName() + "\"")
                             .contentType(MediaType.valueOf(fileEntity.getContentType()))
                             .body(fileEntity.getData());
    }
}
