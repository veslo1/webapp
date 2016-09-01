lock '3.4.0'

set :application, 'buildpay_webapp'
set :repo_url, 'git@github.com:sketchdev/buildpay_webapp.git'
set :deploy_to, '/var/applications/buildpay_webapp'

set :branch, ENV['branch'] || `git rev-parse --abbrev-ref HEAD`.chomp

set :local_dist_path, File.expand_path('../../dist', __FILE__)

set :node_env, ENV['node_env'] || 'production'

#set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')
#set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

namespace :deploy do
  task :create_distribution do
    run_locally do
      with node_env: fetch(:node_env) do
        execute :grunt, :build
      end
    end
  end

  task :upload_distribution do
    on roles(:app) do
      upload! fetch(:local_dist_path), release_path.join('dist'), recursive: true
    end
  end

  task :create_and_upload_distribution do
    invoke 'deploy:create_distribution'
    invoke 'deploy:upload_distribution'
  end

  before 'deploy:publishing', 'create_and_upload_distribution'
end
