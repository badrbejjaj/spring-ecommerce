package project.ecom.springshop.domaine.user;

import project.ecom.springshop.domaine.role.RoleConverter;
import project.ecom.springshop.model.User;

import java.util.ArrayList;
import java.util.List;

public class UserConverter {
    public static UserVo toVo(User bo) {
        if (bo == null)
            return null;
        UserVo vo = new UserVo();
        vo.setId(bo.getId());
        vo.setFirstName(bo.getFirstName());
        vo.setLastName(bo.getLastName());
        vo.setUsername(bo.getUsername());
        vo.setPassword(bo.getPassword());
        vo.setEmail(bo.getEmail());
        vo.setCity(bo.getCity());
        vo.setPhone(bo.getPhone());
        vo.setPassword(bo.getPassword());
        vo.setRoles(RoleConverter.toVoList(bo.getRoles()));
        return vo;
    }
        public static User toBo(UserVo vo) {
        if (vo == null)
            return null;
        User bo = new User();
        if (vo.getId() != null)
            bo.setId(vo.getId());
        bo.setFirstName(vo.getFirstName());
        bo.setLastName(vo.getLastName());
        bo.setUsername(vo.getUsername());
        bo.setPassword(vo.getPassword());
        bo.setEmail(vo.getEmail());
        bo.setCity(vo.getCity());
        bo.setPhone(vo.getPhone());

        bo.setRoles(RoleConverter.toBoList(vo.getRoles()));
        return bo;
    }
    public static List<UserVo> toVoList(List<User> boList) {
        if (boList == null || boList.isEmpty())
            return null;
        List<UserVo> voList = new ArrayList<>();
        for (User user : boList) {
            voList.add(toVo(user));
        }
        return voList;
    }
    public static List<User> toBoList(List<UserVo> voList) {
        if (voList == null || voList.isEmpty())
            return null;
        List<User> boList = new ArrayList<>();
        for (UserVo userVo : voList) {
            boList.add(toBo(userVo));
        }
        return boList;
    }

}
