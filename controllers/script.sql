
-- -----------------------------------------------------
-- Table `Roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Roles` ;

CREATE TABLE IF NOT EXISTS `Roles` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_rol`),
  UNIQUE INDEX `ID_ROL_UNIQUE` (`id_rol` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Usuarios` ;

CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `rut` VARCHAR(12) NOT NULL,
  `nombres` VARCHAR(45) NOT NULL,
  `ap_paterno` VARCHAR(45) NOT NULL,
  `ap_materno` VARCHAR(45) NULL,
  `esta_suscrito` VARCHAR(1) NOT NULL DEFAULT 0,
  `id_rol` INT NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `ID_USUARIO_UNIQUE` (`id_usuario` ASC) ,
  INDEX `fk_USUARIOS_USUARIO_ROLES_idx` (`id_rol` ASC) ,
  CONSTRAINT `fk_USUARIOS_USUARIO_ROLES`
    FOREIGN KEY (`id_rol`)
    REFERENCES `Roles` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Donaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Donaciones` ;

CREATE TABLE IF NOT EXISTS `Donaciones` (
  `id_donacion` INT NOT NULL AUTO_INCREMENT,
  `fecha_donacion` DATE NOT NULL,
  `monto` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_donacion`),
  UNIQUE INDEX `ID_DONACION_UNIQUE` (`id_donacion` ASC) ,
  INDEX `fk_DONACIONES_USUARIOS1_idx` (`id_usuario` ASC) ,
  CONSTRAINT `fk_DONACIONES_USUARIOS1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Ventas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ventas` ;

CREATE TABLE IF NOT EXISTS `Ventas` (
  `ID_VENTA` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `hora` VARCHAR(45) NULL,
  `id_usuario` INT NOT NULL,
  `estado` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`ID_VENTA`),
  UNIQUE INDEX `ID_VENTA_UNIQUE` (`ID_VENTA` ASC) ,
  INDEX `fk_VENTAS_USUARIOS1_idx` (`id_usuario` ASC) ,
  CONSTRAINT `fk_VENTAS_USUARIOS1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Estado_Despacho`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Estado_Despacho` ;

CREATE TABLE IF NOT EXISTS `Estado_Despacho` (
  `id_estado_despacho` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_estado_despacho`),
  UNIQUE INDEX `ID_SEGUIMIENTO_UNIQUE` (`id_estado_despacho` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Despachos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Despachos` ;

CREATE TABLE IF NOT EXISTS `Despachos` (
  `id_despacho` INT NOT NULL AUTO_INCREMENT,
  `fecha_despacho` DATE NOT NULL,
  `fecha_entrega` DATE NULL,
  `id_venta` INT NOT NULL,
  `id_estado_despacho` INT NOT NULL,
  PRIMARY KEY (`id_despacho`),
  UNIQUE INDEX `ID_DESPACHO_UNIQUE` (`id_despacho` ASC) ,
  INDEX `fk_DESPACHOS_VENTAS1_idx` (`id_venta` ASC) ,
  INDEX `fk_Despachos_Estado_Despacho1_idx` (`id_estado_despacho` ASC) ,
  CONSTRAINT `fk_DESPACHOS_VENTAS1`
    FOREIGN KEY (`id_venta`)
    REFERENCES `Ventas` (`ID_VENTA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Despachos_Estado_Despacho1`
    FOREIGN KEY (`id_estado_despacho`)
    REFERENCES `Estado_Despacho` (`id_estado_despacho`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Promociones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Promociones` ;

CREATE TABLE IF NOT EXISTS `Promociones` (
  `id_promocion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `porcentaje_descuento` INT NOT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `estado` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_promocion`),
  UNIQUE INDEX `ID_PROMOCIONES_UNIQUE` (`id_promocion` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Especies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Especies` ;

CREATE TABLE IF NOT EXISTS `Especies` (
  `id_especie` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `INT` VARCHAR(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_especie`),
  UNIQUE INDEX `idESPECIES_UNIQUE` (`id_especie` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Productos` ;

CREATE TABLE IF NOT EXISTS `Productos` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `ISBN` VARCHAR(45) NOT NULL,
  `autor` VARCHAR(45) NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `valor` INT NOT NULL,
  `stock` INT NOT NULL,
  `imagen` VARCHAR(205) NOT NULL,
  `id_promocion` INT NULL,
  `id_especie` INT NOT NULL,
  `estado` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_producto`),
  UNIQUE INDEX `ID_PRODUCTOS_UNIQUE` (`id_producto` ASC) ,
  INDEX `fk_PRODUCTOS_PROMOCIONES1_idx` (`id_promocion` ASC) ,
  INDEX `fk_PRODUCTOS_ESPECIES1_idx` (`id_especie` ASC) ,
  CONSTRAINT `fk_PRODUCTOS_PROMOCIONES1`
    FOREIGN KEY (`id_promocion`)
    REFERENCES `Promociones` (`id_promocion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCTOS_ESPECIES1`
    FOREIGN KEY (`id_especie`)
    REFERENCES `Especies` (`id_especie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Productos_Ventas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Productos_Ventas` ;

CREATE TABLE IF NOT EXISTS `Productos_Ventas` (
  `id_producto_venta` INT NOT NULL AUTO_INCREMENT,
  `valor_venta` INT NOT NULL,
  `cantidad_venta` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `id_venta` INT NOT NULL,
  `estado` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_producto_venta`),
  UNIQUE INDEX `ID_PRODUCTOSVENTAS_UNIQUE` (`id_producto_venta` ASC) ,
  INDEX `fk_PRODUCTOSVENTAS_PRODUCTOS1_idx` (`id_producto` ASC) ,
  INDEX `fk_PRODUCTOSVENTAS_VENTAS1_idx` (`id_venta` ASC) ,
  CONSTRAINT `fk_PRODUCTOSVENTAS_PRODUCTOS1`
    FOREIGN KEY (`id_producto`)
    REFERENCES `Productos` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCTOSVENTAS_VENTAS1`
    FOREIGN KEY (`id_venta`)
    REFERENCES `Ventas` (`ID_VENTA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
