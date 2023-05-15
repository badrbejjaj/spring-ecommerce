package project.ecom.springshop.domaine;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ApiResponseVo {
    private String message;
    private int code;

    public ApiResponseVo(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
