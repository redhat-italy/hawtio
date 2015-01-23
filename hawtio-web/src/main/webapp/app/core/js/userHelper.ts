module Core {

    var ROLE_MODULE_CLASS:string = "org.apache.karaf.jaas.modules.RolePrincipal";
    var ROLE_PRINCIPAL_CLASS:string = "org.apache.karaf.jaas.boot.principal.RolePrincipal";
    var GROUP_PRINCIPAL_CLASS:string = "org.apache.karaf.jaas.boot.principal.GroupPrincipal";

    export function IsMemberOf(user:Core.UserDetails, group:string) {
        if (angular.isObject(user) && angular.isObject(user.loginDetails) && angular.isArray(user.loginDetails["principals"])) {
            var principals:any[] = user.loginDetails["principals"];

            return principals.any((p) => {
                var type = p["type"];
                var name = p["name"];

                return (angular.isString(name) && angular.equals(name, group)) &&
                    (angular.isString(type)
                    && (
                    angular.equals(type, ROLE_MODULE_CLASS)
                    || angular.equals(type, ROLE_PRINCIPAL_CLASS)
                    || angular.equals(type, GROUP_PRINCIPAL_CLASS)
                    ));
            });
        }
        return false;
    }
}