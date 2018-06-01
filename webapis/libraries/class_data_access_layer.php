<?php

 //Requiere Configuration Manager
 require_once 'class_util_configurationManager.php';

class Data_Access_Layer {

    // Connection information.
    private $connection;

    // SQL querey information.
    private $querey;

    // Connected to the database server.
    private $connected = false;

    // Errors.
    private $error;

    // Hostname or IP address of the database server.
    private $host;

    // Port to access the database server.
    private $port = 3306;

    // Name of the database.
    private $database;

    // Username.
    private $username;

    // Password.
    private $password; // This is a random password!

    // Database charset.
    private $charset = "UTF8";

    // PDO options.
    private $options = [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_PERSISTENT => true
    ];

    /**
    *
    * Constructor.
    *
    * Creates connection to the database server.
    *
    **/

    public function __construct() {

        if ($this->connected === true) {

            return true;

        } else {

            try {
              $configuration_manager = new Configuration_Manager();
              $this->host     = $configuration_manager->getSetting('Host');
              $this->username = $configuration_manager->getSetting('User');
              $this->password = $configuration_manager->getSetting('Password');
              $this->database = $configuration_manager->getSetting('DataBase');              

              $this->connection = new PDO("mysql:host={$this->host};port={$this->port};dbname={$this->database};charset={$this->charset}", $this->username, $this->password, $this->options);
              $this->connected = true;

            } catch (PDOException $e) {

                $this->error = $e->getMessage();
                echo $e->getMessage();
                return null;

            }

        }

    }

    /**
    *
    * Query the Database.
    *
    * Used for SELECT, INSERT, UPDATE and DELETE statements.
    *
    **/

    public function query($query, $parameters = [], $expectSingleResult = false) {

        if ($this->connected === true) {

            if (is_string($query) && $query !== "" && is_array($parameters) && is_bool($expectSingleResult)) {

                try {

                    // Prepare SQL querey.
                    $this->querey = $this->connection->prepare($query);

                    // Bind parameters to SQL querey.
                    foreach ($parameters as $placeholder => $value) {

                        // Parameter type.
                        if (is_string($value)) {

                            // Parameter is a string.
                            $type = PDO::PARAM_STR;

                        } elseif (is_int($value)) {

                            // Parameter is a integer.
                            $type = PDO::PARAM_INT;

                        } elseif (is_bool($value)) {

                            // Parameter is a boolean.
                            $type = PDO::PARAM_BOOL;

                        } else {

                            // Parameter is NULL.
                            $type = PDO::PARAM_NULL;

                        }

                        // Bind parameter.
                        $this->querey->bindValue($placeholder, $value, $type);

                    }

                    // Execute SQL querey.
                    $this->querey->execute();

                    // Get Result of SQL querey.
                    if ($expectSingleResult === true) {

                        $results = $this->querey->fetch();

                    } else {

                        $results = $this->querey->fetchAll();
                    }
                    
                    //borrar de la variable querey la consulta una ves realizada
                    unset($this->querey);

                    // Return results of SQL querey.
                    return $results;

                } catch (PDOException $e) {
                    echo $e->getMessage();
                    $this->error = $e->getMessage();

                }

            } else {

                $this->error = "Invalid Querey or Paramaters";

                return null;
            }
        } else {

            $this->error = "Not Connected to Database Server";

            return null;
        }
    }

    /**
    *
    * Row count for the last querey.
    *
    **/

    public function rowCount() {

        if ($this->connected === true) {
            return $this->querey->rowCount();
        } else {

            $this->error = "Not Connected to Database Server";

            return null;
        }
    }

    /**
    *
    * Get ID for the last querey.
    *
    **/

    public function lastId() {

        if ($this->connected === true) {

            return $this->connection->lastInsertId();
        } else {

            $this->error = "Not Connected to Database Server";

            return null;
        }
    }

    /**
    *
    * Begin a transaction.
    *
    **/

    public function beginTransaction() {

        if ($this->connected === true) {

            return $this->connection->beginTransaction();

        } else {

            $this->error = "Not Connected to Database Server";

            return null;

        }

    }

    /**
    *
    * Rollback and cancel/end a transaction.
    *
    **/

    public function cancelTransaction() {

        if ($this->connected === true) {

            return $this->connection->rollBack();

        } else {

            $this->error = "Not Connected to Database Server";

            return null;

        }

    }

    /**
    *
    * Or...
    *
    **/

    public function rollbackTransaction() {

        if ($this->connected === true) {

            return $this->connection->rollBack();

        } else {

            $this->error = "Not Connected to Database Server";

            return null;

        }

    }

    /**
    *
    * Commit and end a transaction.
    *
    **/

    public function endTransaction() {

        if ($this->connected === true) {

            return $this->connection->commit();

        } else {

            $this->error = "Not Connected to Database Server";

            return null;

        }

    }

    /**
    *
    * Close the current connection the the database server.
    *
    **/

    public function close() {

        $this->connection = null;

    }

}

?>