DROP KEYSPACE IF EXISTS reservations;

CREATE KEYSPACE reservations
WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor' : 1}
AND durable_writes = false;

USE reservations;

CREATE TYPE reservation (
  id uuid,
  reservee text,
  reservation_time text
);

CREATE TABLE restaurants (
  id uuid,
  name text,
  available_table int,
  total_table int,
  opening_hour text,
  closing_hour text,
  reservations list<frozen <reservation>>,
  PRIMARY KEY (id)
);

CREATE CUSTOM INDEX ON restaurants(name) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS = {'mode': 'CONTAINS', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.StandardAnalyzer', 'case_sensitive': 'false'};
