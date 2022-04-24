package disaster.loss.service.dto;

import disaster.loss.domain.IdServer;

public class IdServerTemplateDTO {
    private int number;

    private String paddedNumber;

    private IdServer currentIdServer;

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getPaddedNumber() {
        return paddedNumber;
    }

    public void setPaddedNumber(String paddedNumber) {
        this.paddedNumber = paddedNumber;
    }

    public IdServer getCurrentIdServer() {
        return currentIdServer;
    }

    public void setCurrentIdServer(IdServer currentIdServer) {
        this.currentIdServer = currentIdServer;
    }

    @Override
    public String toString() {
        return "IdServerTemplateDTO{" +
            "number=" + number +
            ", paddedNumber='" + paddedNumber + '\'' +
            ", currentIdServer=" + currentIdServer +
            '}';
    }
}
